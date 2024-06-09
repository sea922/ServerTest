/* eslint-disable no-unused-vars */
// third party components
const Sequelize = require("sequelize");
const async = require("async");
const redis = require("redis");

// our components
const config = require("../configs/general.config");
const { PlayerInventory, Item } = require("../databases/postgreSQL/index");
const constant = require("../utils/constant.utils");
const supporter = require("../utils/supporter.utils");
const { pageableV2 } = require("../utils/pieces.utils");
const { redisClient, parseRedisResult, prepareRedisData } = require("../utils/redis");

// const redisClient = redis.createClient({
//   socket: { host: `${process.env.REDIS_HOST}`, port: `${process.env.REDIS_PORT}` },
// });


module.exports = {

  getOneItemOfPlayer: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      PlayerInventory.findOne({
        where: { item_id: id, player_id: accessUserId },
        include: [
          {
            model: Item,
            as: "item",
            attributes: ["id", "name", "description", "type","metadata"],
          },
        ],
      })
        .then(function (result) {
          if (result) {
            if (result.deletedAt != null) {
              return callback(1, "deleted_result", 403, "item not exist", null);
            }
            return callback(null, null, 200, null, result);
          } else {
            return callback(1, "wrong_item", 400, "wrong item", null);
          }
        })
        .catch(function (error) {
          return callback(1, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "get_user_fail", 400, error, null);
    }
  },

  getAllPlayerItems: async function (accessUserId, accessUserType, filter, sort, search, pageNumber, pageSize, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "Permission denied", null);
      }
  
      const key = `player_inventory:${accessUserId}:page:${pageNumber}:size:${pageSize}`;
      let inventory = null;

      // const cachedResult = await redisClient.get(key);
      const cachedResult = await redisClient.zRange(key, (pageNumber - 1) * pageSize, pageNumber * pageSize - 1, "WITHSCORES");
      if (cachedResult && cachedResult.length > 0) {
        inventory = parseRedisResult(cachedResult);
      } else {
        const query = {
          where: {
            player_id: accessUserId, 
          },
          include: [
            {
              model: Item,
              as: "item",
              attributes: ["id", "name", "description", "type","metadata"],
            },
          ],
        };

        supporter.pasteQuery(PlayerInventory, query, filter, sort, search, pageNumber, pageSize);
  
        inventory = await PlayerInventory.findAndCountAll(query);

        // await redisClient.set(key, JSON.stringify(inventory));
         // Convert the result to the format expected by zadd command
        const redisData = prepareRedisData(inventory.rows);
        await redisClient.zAdd(key, redisData);
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
  

  update: function (accessUserId, accessUserType, id, body, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }
      //id -> playerId

      const data = {};
      data.updatedBy = accessUserId;
      data.player_id = id;
      if (body.item_id != "" && body.item_id != null) {
        data.item_id = body.item_id;
      }
      if (body.quantity != "" && body.quantity != null) {
        data.quantity = body.quantity;
      }

      async.waterfall([
        // get result
        function (cb) {
          PlayerInventory.findOne({
            where: {
              player_id: data.player_id,
              item_id: data.item_id
            },
          }).then(function (result) {
            data.price = result.price;
            if (!result) {
              return callback(1, "wrong_update", 420, "wrong update", null);
            }
            return cb(null, result);
          });
        },
        // update car
        function (inventory, cb) {
          PlayerInventory.build(data)
            .validate()
            .then(function () {
              Object.assign(inventory, data);
              inventory
                .save({
                  validate: false,
                })
                .then(function (result) {
                  return callback(null, null, 200, null, result);
                })
                .catch(function (error) {
                  return callback(true, "query_fail", 400, error, null);
                });
            })
            .catch(function (validate) {
              const errors = validate.errors.map(function (e) {
                return {
                  name: e.path,
                  message: e.message,
                };
              });
              return callback(1, "invalid_input", 403, errors, null);
            });
        },
      ]);
    } catch (error) {
      return callback(1, "update_fail", 400, error, null);
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
