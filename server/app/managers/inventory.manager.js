/* eslint-disable no-unused-vars */
// third party components
const Sequelize = require("sequelize");
const async = require("async");

// our components
const config = require("../configs/general.config");
const { Item, Player } = require("../databases/postgreSQL/index");
const constant = require("../utils/constant.utils");
const supporter = require("../utils/supporter.utils");
const { pageableV2 } = require("../utils/pieces.utils");

module.exports = {
  create: function (accessUserId, accessUserType, data, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "Permission denied", null);
      }
  
      Result.findOne({
        where: {
          carId: data.carId,
          criteriaId: data.criteriaId
        }
      }).then(function(existingResult) {
        if(existingResult) {
          existingResult.update({
            isGood: data.isGood,
            note: data.note,
            createdBy: accessUserId
          }).then(function(updatedResult) {
            return callback(null, null, 200, null, updatedResult);
          }).catch(function(error) {
            return callback(true, "update_fail", 400, error, null);
          });
        } else {
          Result.build({
            carId: data.carId,
            criteriaId: data.criteriaId,
            isGood: data.isGood,
            note: data.note,
            createdBy: accessUserId,
            updatedBy: accessUserId
          }).validate()
          .then(function (result) {
            result
              .save({
                validate: false,
              })
              .then(function (res) {
                return callback(null, null, 200, null, res);
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
        }
      }).catch(function(error) {
        return callback(true, "query_fail", 400, error, null);
      });
    } catch (error) {
      return callback(1, "create_car_fail", 400, error, null);
    }
  },


  getOne: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      Result.findOne({
        attributes: [
          "id",
          "carId",
          "criteriaId",
          "isGood",
          "note",
          "updatedBy",
          "createdAt",
          "updatedAt",
          "deleted",
        ],
        where: { id: id },
        include: [{ 
            model: User, 
            as: 'Inspector', 
            attributes: ['id', 'username', 'email']
          }]
      })
        .then(function (result) {
          if (result) {
            if (result.deleted != constant.BOOLEAN_ENUM.FALSE) {
              return callback(
                1,
                "deleted_result",
                403,
                "result has been deleted",
                null
              );
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

  getAll: function (
    accessUserId,
    accessUserType,
    filter,
    sort,
    search,
    pageNumber,
    pageSize,
    callback
  ) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const query = {
        attributes: [
          "id",
          "carId",
          "criteriaId",
          "isGood",
          "note",
          "updatedBy",
          "createdAt",
          "updatedAt",
          "deleted",
        ],
        where: {
          deleted: constant.BOOLEAN_ENUM.FALSE,
        },
          include: [{ 
            model: User, 
            as: 'Inspector', 
            attributes: ['id', 'username', 'email']
          }]
      };

      // make query for filter, sorting, searching,  paginaion
      supporter.pasteQuery(
        Result,
        query,
        filter,
        sort,
        search,
        pageNumber,
        pageSize
      );
      Result.findAndCountAll(query)
        .then(function (result) {
          const foundCarList = result.rows;
          const data = {
            data: foundCarList,
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
      return callback(1, "get_result_fail", 400, error.message, null);
    }
  },

  update: function (accessUserId, accessUserType, id, body, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.MECHANICAL) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const data = {};
      data.updatedBy = accessUserId;
      if (body.carId != "" && body.carId != null) {
        data.carId = body.carId;
      }
      if (body.criteriaId != "" && body.criteriaId != null) {
        data.criteriaId = body.criteriaId;
      }
      if (body.note != "" && body.note != null) {
        data.note = body.note;
      }

      async.waterfall([
        // get result
        function (cb) {
          Result.findOne({
            where: {
              id: id,
              deleted: constant.BOOLEAN_ENUM.FALSE,
            },
          }).then(function (result) {
            if (!result) {
              return callback(1, "wrong_car", 420, "wrong car", null);
            }
            return cb(null, result);
          });
        },
        // update car
        function (car, cb) {
          Result.build(data)
            .validate()
            .then(function () {
              Object.assign(car, data);
              car
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
      return callback(1, "update_car_fail", 400, error, null);
    }
  },

  delete: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.MECHANICAL) {
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
