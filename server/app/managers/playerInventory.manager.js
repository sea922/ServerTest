/* eslint-disable no-unused-vars */
// third party components
const Sequelize = require("sequelize");
const async = require("async");

// our components
const config = require("../configs/general.config");
const { PlayerInventory, Item, Player } = require("../databases/postgreSQL/index");
const constant = require("../utils/constant.utils");
const supporter = require("../utils/supporter.utils");
const { pageableV2 } = require("../utils/pieces.utils");
const {
  redisClient,
  parseRedisResult,
  prepareRedisData,
  saveItemsToRedis,
  getPlayerItems,
  updateItem,
  deletePlayerItem,
  addItemToPlayerInventory,
} = require("../utils/redis");
const { produceMessage, processTransactions } = require("../utils/kafka");
const Logger = require("../utils/logger.utils");

module.exports = {
  getOneItemOfPlayer: async function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const key = `player_inventory:${accessUserId}:${id}`;
      let item = null;

      try {
        // Check Redis
        const cachedResult = await redisClient.zRange(key, 0, -1, "WITHSCORES");
        if (cachedResult && cachedResult.length > 0) {
          const inventory = parseRedisResult(cachedResult);
          item = inventory.rows.find((i) => i.itemId == id);

          if (item) {
            if (item.deletedAt != null) {
              return callback(1, "deleted_result", 403, "item not exist", null);
            }
            return callback(null, null, 200, null, item);
          }
        }
      } catch (err) {
        Logger.error("Redis error: " + err);
      }

      const result = await PlayerInventory.findOne({
        where: { itemId: id, playerId: accessUserId },
        include: [
          {
            model: Item,
            as: "item",
            attributes: ["id", "name", "description", "type", "metadata"],
          },
        ],
      });

      if (result) {
        if (result.deletedAt != null) {
          return callback(1, "deleted_result", 403, "item not exist", null);
        }

        try {
          const redisData = { score: 0, value: JSON.stringify(result) };
          await redisClient.zAdd(key, redisData);
        } catch (err) {
          Logger.error("error: " + err);
        }

        return callback(null, null, 200, null, result);
      } else {
        return callback(1, "wrong_item", 400, "wrong item", null);
      }
    } catch (error) {
      Logger.error("error: " + err);
      return callback(1, "get_item_fail", 400, error, null);
    }
  },

  getAllPlayerItems: async function (accessUserId, accessUserType, filter, sort, search, pageNumber, pageSize, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "Permission denied", null);
      }

      let inventory = null;
      // const cachedResult = await redisClient.get(key);
      const cachedResult = await getPlayerItems(accessUserId);
      if (cachedResult && cachedResult.count > 0) {
        inventory = cachedResult;
      } else {
        const query = {
          where: {
            playerId: accessUserId,
            deletedAt: null,
          },
          include: [
            {
              model: Item,
              as: "item",
              attributes: ["id", "name", "description", "type", "metadata", "sellPrice", "buyPrice"],
            },
          ],
        };

        supporter.pasteQuery(PlayerInventory, query, filter, sort, search, pageNumber, pageSize);

        inventory = await PlayerInventory.findAndCountAll(query);

        const listItems = inventory.rows;
        saveItemsToRedis(listItems);
        // await redisClient.zAdd(key, redisData);
      }

      const data = {
        data: inventory.rows,
        pagination: pageableV2(pageNumber, pageSize, inventory.count),
        items: {
          begin: pageNumber * pageSize - pageSize + 1,
          end: Math.min(pageNumber * pageSize, inventory.count),
          total: inventory.count,
        },
      };

      return callback(null, null, 200, null, data);
    } catch (error) {
      return callback(1, "get_result_fail", 400, error.message, null);
    }
  },

  sellItems: async function (accessUserId, accessUserType, body, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const data = {};
      data.updatedBy = accessUserId;
      data.playerId = accessUserId;

      if (body.itemId != "" && body.itemId != null) {
        data.itemId = body.itemId;
      }
      if (body.quantity != "" && body.quantity != null) {
        data.quantity = body.quantity;
      }

      if (!data.itemId || !body.quantity || body.quantity < 1) {
        return callback(1, "missing", 403, "Please provide itemId, and quantity > 0", null);
      }

      async.waterfall([
        // get result
        function (cb) {
          Item.findOne({
            where: {
              id: data.itemId,
            },
          }).then(function (result) {
            if (!result) {
              return callback(1, "wrong_update", 420, "item does not exist", null);
            }
            return cb(null, result);
          });
        },
        // update
        async function (result, cb) {
          try {
            data.sellPrice = result.sellPrice;
            // Validate and save player inventory
            const playerInventory = await PlayerInventory.findOne({
              where: { playerId: data.playerId, itemId: data.itemId },
            });
            if (!playerInventory || data.quantity > playerInventory.quantity || playerInventory.quantity - parseInt(data.quantity) < 0) {
              return callback(1, "player_inventory_not_found", 404, "Item not found or insufficient", null);
            }

            const totalPrice = data.sellPrice * data.quantity;

            // Update player balance
            const player = await Player.findOne({
              where: {
                id: data.playerId,
              },
              attributes: ["id", "username", "coin", "capacity"],
            });
            if (!player) {
              return callback(1, "player_not_found", 404, "Player not found", null);
            }

            // Record transaction history
            const transactionKey = `transaction:${Date.now()}:${accessUserId}`;
            player.coin += totalPrice;
            player.capacity += parseInt(data.quantity);
            playerInventory.quantity -= data.quantity;
            if (playerInventory.quantity > 0) {
              playerInventory.save();
              await updateItem(data.itemId, {
                quantity: playerInventory.quantity,
              });
            } else {
              await PlayerInventory.destroy({ where: { id: playerInventory.id } });
              await deletePlayerItem(data.playerId, data.itemId);
            }
            player.save();

            const transactionData = {
              playerId: data.playerId,
              itemId: data.itemId,
              type: constant.TRANSACTION_TYPE.SELL,
              quantityChange: data.quantity,
              previousQuantity: playerInventory.quantity + parseInt(data.quantity),
              currentQuantity: playerInventory.quantity,
              totalAmountChange: totalPrice,
              timestamp: Date.now(),
              // dataChange: ItemData
            };

            const newItemData = {
              quantity: playerInventory.quantity,
            };

            // await redisClient.set(transactionKey, JSON.stringify(transactionData));

            // Produce Kafka message
            await produceMessage("inventory_updates", transactionData);

            return callback(null, null, 200, null, playerInventory);
          } catch (error) {
            return callback(1, "sell_item_fail", 400, error, null);
          }
        },
      ]);
    } catch (error) {
      return callback(1, "sell_item_fail", 400, error, null);
    }
  },

  buyItems: async function (accessUserId, accessUserType, body, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const data = {};
      data.updatedBy = accessUserId;
      data.playerId = accessUserId;

      if (body.itemId != "" && body.itemId != null) {
        data.itemId = body.itemId;
      }
      if (body.quantity != "" && body.quantity != null) {
        data.quantity = parseInt(body.quantity);
      }

      if (!data.itemId || !data.quantity || data.quantity < 1) {
        return callback(1, "missing", 403, "Please provide itemId, and quantity > 0", null);
      }

      async.waterfall([
        // get result
        function (cb) {
          Item.findOne({
            where: {
              id: data.itemId,
            },
          }).then(function (result) {
            if (!result) {
              return callback(1, "wrong_buy", 420, "item does not exist", null);
            }
            return cb(null, result);
          });
        },
        // update
        async function (result, cb) {
          try {
            data.buyPrice = result.buyPrice;
            data.sellPrice = result.sellPrice;
            data.name = result.name;
            data.description = result.description;
            data.type = result.type;
            data.metadata = result.metadata;

            const totalPrice = data.buyPrice * data.quantity;

            // Update player balance
            const player = await Player.findOne({
              where: {
                id: data.playerId,
                capacity: { [Sequelize.Op.gt]: parseInt(data.quantity) },
                coin: { [Sequelize.Op.gte]: totalPrice },
              },
              attributes: ["id", "username", "coin", "capacity"],
            });
            if (!player) {
              return callback(1, "item_purchase_failed", 404, "Not enough coin or capacity", null);
            }

            let playerInventory = await PlayerInventory.findOne({
              where: { playerId: data.playerId, itemId: data.itemId },
            });

            if (playerInventory) {
              playerInventory.quantity += parseInt(data.quantity);
              playerInventory.save();
              await updateItem(data.itemId, {
                quantity: playerInventory.quantity,
              });
            } else {
              playerInventory = await PlayerInventory.create({
                playerId: data.playerId,
                itemId: data.itemId,
                quantity: data.quantity,
                sellPrice: data.sellPrice,
                createdBy: global.INFO.anonymousId,
                updatedBy: global.INFO.anonymousId,
              });
              await addItemToPlayerInventory(data.playerId, data.itemId, data.quantity, {
                name: data.name,
                description: data.description,
                type: data.type,
                metadata: data.metadata,
                quantity: data.quantity,
                sellPrice: data.sellPrice,
                buyPrice: data.buyPrice,
              });
            }

            // // Record transaction history
            playerInventory.playerId = data.playerId;
            player.coin -= totalPrice;
            player.capacity -= parseInt(data.quantity);
            player.save();

            const transactionData = {
              playerId: data.playerId,
              itemId: data.itemId,
              type: constant.TRANSACTION_TYPE.BUY,
              quantityChange: data.quantity,
              previousQuantity: playerInventory.quantity - parseInt(data.quantity),
              currentQuantity: playerInventory.quantity,
              totalAmountChange: totalPrice,
              timestamp: Date.now(),
              // dataChange: ItemData
            };

            // Produce Kafka message
            await produceMessage("inventory_updates", transactionData);

            return callback(null, null, 200, null, playerInventory);
          } catch (error) {
            return callback(1, "buy_item_fail", 400, error, null);
          }
        },
      ]);
    } catch (error) {
      return callback(1, "buy_item_fail", 400, error, null);
    }
  },

  delete: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.MANAGER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      Result.update(
        {
          deleted: constant.BOOLEAN_ENUM.TRUE,
        },
        {
          where: { id: id },
        }
      )
        .then(function (result) {
          if (!result[0]) {
            return callback(1, "wrong_car", 403, "wrong car", null);
          } else {
            return callback(null, null, 200, null, result);
          }
        })
        .catch(function (error) {
          return callback(true, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "delete_car_fail", 400, error, null);
    }
  },
};
