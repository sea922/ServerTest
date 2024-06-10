/* eslint-disable no-unused-vars */
// third party components
const Sequelize = require("sequelize");
const async = require("async");

// our components
const config = require("../configs/general.config");
const { Item } = require("../databases/postgreSQL/index");
const { ItemDetail } = require("../databases/postgreSQL/index");
const constant = require("../utils/constant.utils");
const supporter = require("../utils/supporter.utils");
const { pageableV2 } = require("../utils/pieces.utils");
const { redisClient, updateItem, parseRedisResult } = require("../utils/redis");

module.exports = {
  create: function (accessUserId, accessUserType, data, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.MANAGER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }
      Item.build({
        name: data.name,
        type: data.password,
        description: data.description,
        type: data.type,
        metadata: data.metadata,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        createdBy: global.INFO.anonymousId,
        updatedBy: global.INFO.anonymousId,
      })
        .validate()
        .then(function (item) {
          item
            .save({
              validate: false,
            })
            .then(function (result) {
              const key = `listItem`;

              return callback(null, null, 200, null, result);
            })
            .catch(function (error) {
              console.log(error);
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
    } catch (error) {
      return callback(1, "create_item_fail", 400, error, null);
    }
  },

  getOne: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      Item.findOne({
        attributes: ["id", "name", "description", "type", "metadata", "buyPrice", "sellPrice", "updatedBy", "createdAt", "updatedAt", "deleted"],
        where: { id: id },
      })
        .then(function (result) {
          if (result) {
            if (result.deleted != constant.BOOLEAN_ENUM.FALSE) {
              return callback(1, "deleted_result", 403, "result has been deleted", null);
            }
            return callback(null, null, 200, null, result);
          } else {
            return callback(1, "wrong_result", 400, "wrong result", null);
          }
        })
        .catch(function (error) {
          return callback(1, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "get_user_fail", 400, error, null);
    }
  },

  getAll: async function (accessUserId, accessUserType, filter, sort, search, pageNumber, pageSize, callback) {
    try {
      // Check user permissions
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "Permission denied", null);
      }

      let listItems = null;
      const key = `list_items`;
      const cachedResult = await redisClient.get(key);

      if (cachedResult && cachedResult.count > 0) {
        listItems = parseRedisResult(cachedResult);
        const data = {
          data: listItems.rows,
          pagination: pageableV2(pageNumber, pageSize, listItems.count),
          items: {
            begin: pageNumber * pageSize - pageSize + 1,
            end: Math.min(pageNumber * pageSize, listItems.count),
            total: listItems.count,
          },
        };
        return callback(null, null, 200, null, data);
      } else {
        const query = {
          attributes: ["id", "name", "description", "type", "metadata", "buyPrice", "sellPrice", "updatedBy", "createdAt", "updatedAt", "deleted"],
          where: {
            deleted: constant.BOOLEAN_ENUM.FALSE,
          },
        };

        supporter.pasteQuery(Item, query, filter, sort, search, pageNumber, pageSize);

        Item.findAndCountAll(query)
          .then(function (result) {
            const foundItemList = result.rows;
            const data = {
              data: foundItemList,
              pagination: pageableV2(pageNumber, pageSize, result.count),
              items: {
                begin: pageNumber * pageSize - pageSize + 1,
                end: Math.min(pageNumber * pageSize, result.count),
                total: result.count,
              },
            };

            // Cache the data in Redis
            const serializedData = JSON.stringify(data);
            redisClient.set(key, serializedData);

            return callback(null, null, 200, null, data);
          })
          .catch(function (error) {
            return callback(1, "query_fail", 400, error.message, null);
          });
      }
    } catch (error) {
      return callback(1, "get_item_fail", 400, error.message, null);
    }
  },

  update: function (accessUserId, accessUserType, id, body, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.MANAGER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const data = {};
      data.updatedBy = accessUserId;

      if (body.name != "" && body.name != null) {
        data.name = body.name;
      }
      if (body.description != "" && body.description != null) {
        data.description = body.description;
      }
      if (body.sellPrice != "" && body.sellPrice != null) {
        data.sellPrice = body.sellPrice;
      }

      if (body.buyPrice != "" && body.buyPrice != null) {
        data.buyPrice = body.buyPrice;
      }

      async.waterfall([
        // get result
        function (cb) {
          Item.findOne({
            where: {
              id: id,
              deleted: constant.BOOLEAN_ENUM.FALSE,
            },
          }).then(function (result) {
            if (!result) {
              return callback(1, "wrong_item", 420, "wrong item", null);
            }
            return cb(null, result);
          });
        },
        // update car
        function (item, cb) {
          Item.build(data)
            .validate()
            .then(function () {
              Object.assign(item, data);
              item
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
      return callback(1, "update_item_fail", 400, error, null);
    }
  },

  delete: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.MANAGER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      Item.update(
        {
          deleted: constant.BOOLEAN_ENUM.TRUE,
        },
        {
          where: { id: id },
        }
      )
        .then(function (result) {
          if (!result[0]) {
            return callback(1, "wrong_item", 403, "wrong item", null);
          } else {
            return callback(null, null, 200, null, result);
          }
        })
        .catch(function (error) {
          return callback(true, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "delete_item_fail", 400, error, null);
    }
  },
};
