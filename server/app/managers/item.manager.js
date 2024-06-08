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
        attributes: ["id", "name", "description", "type", "metadata", "updatedBy", "createdAt", "updatedAt", "deleted"],
        where: { item_id: id },
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

  getAll: function (accessUserId, accessUserType, filter, sort, search, pageNumber, pageSize, callback) {
    try {
      // Check user permissions

      console.log(accessUserType);
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const query = {
        attributes: ["id", "name", "description", "type", "metadata", "updatedBy", "createdAt", "updatedAt", "deleted"],
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
              end: pageNumber * pageSize,
              total: result.count,
            },
          };
          return callback(null, null, 200, null, data);
        })
        .catch(function (error) {
          return callback(1, "query_fail", 400, error.message, null);
        });
    } catch (error) {
      // Handle unexpected errors
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
