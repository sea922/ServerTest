/* eslint-disable no-unused-vars */
// third party components
const Sequelize = require("sequelize");
const async = require("async");

// our components
const config = require("../configs/general.config");
const { Player } = require("../databases/postgreSQL/index");
const constant = require("../utils/constant.utils");
const supporter = require("../utils/supporter.utils");
const { pageableV2 } = require("../utils/pieces.utils");
const VerifyData = require("../utils/verifyData.util");

module.exports = {
  create: function (data, callback) {
    try {
      Player.build({
        username: data.username,
        password: data.password,
        email: data.email,
        displayName: data.displayName,
        createdBy: global.INFO.anonymousId,
        updatedBy: global.INFO.anonymousId,
      })
        .validate()
        .then(function (user) {
          user
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
    } catch (error) {
      return callback(1, "create_user_fail", 400, error, null);
    }
  },
  me: function (accessUserId, callback) {
    try {
      Player.findOne({
        where: {
          id: accessUserId,
        },
        attributes: { exclude: ["password"] },
      })
        .then(async (user) => {
          if (user) {
            return callback(null, null, 200, null, user);
          }
          return callback(null, null, 200, null, null);
        })
        .catch((error) => {
          return callback(1, "get_user_fail", 400, error.message || error, null);
        });
    } catch (error) {
      return callback(1, "get_user_fail", 400, error.message || error, null);
    }
  },

  getOne: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }
      if (!VerifyData.validNumberParam(id)) {
        return callback(1, "invalid_id", 400, "user id is in-correct format", null);
      }

      Player.findOne({
        attributes: ["id", "username", "displayName", "email", "type", "createdAt", "updatedAt", "deleted"],
        where: { id: id },
      })
        .then(function (user) {
          if (user) {
            if (user.deleted != constant.BOOLEAN_ENUM.FALSE) {
              return callback(1, "deleted_user", 403, "user has been deleted", null);
            }
            return callback(null, null, 200, null, user);
          } else {
            return callback(1, "wrong_user", 400, "wrong user", null);
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
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const query = {
        attributes: ["id", "username", "displayName", "password", "email", "type", "createdAt", "updatedAt"],
        where: {
          deleted: constant.BOOLEAN_ENUM.FALSE,
        },
      };

      // make query for filter, sorting, searching,  paginaion
      supporter.pasteQuery(User, query, filter, sort, search, pageNumber, pageSize);
      Player.findAndCountAll(query)
        .then(function (result) {
          const foundUserList = result.rows;
          const data = {
            data: foundUserList,
            pagination: pageableV2(pageNumber, pageSize, result.count),
            items: {
              begin: pageNumber * pageSize - pageSize + 1,
              end: pageNumber * pageSize,
              total: result.count,
            },
          };
          // const paginationResult = supporter.paginationResult(
          //   result,
          //   pageNumber,
          //   pageSize
          // );
          return callback(null, null, 200, null, data);
        })
        .catch(function (error) {
          return callback(1, "query_fail", 400, error.message, null);
        });
    } catch (error) {
      return callback(1, "get_users_fail", 400, error.message, null);
    }
  },

  update: function (accessUserId, accessUserType, id, body, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.SUPER_ADMIN) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      const data = {};
      if (body.username != "" && body.username != null) {
        data.username = body.username;
      }
      if (body.password != "" && body.password != null) {
        data.password = body.password;
      }
      if (body.email != "" && body.email != null) {
        data.email = body.email;
      }
      if (body.displayName != "" && body.displayName != null) {
        data.displayName = body.displayName;
      }
      if (body.type != "" && body.type != null) {
        data.type = body.type;
      }

      async.waterfall([
        // get user
        function (cb) {
          Player.findOne({
            where: {
              id: id,
              deleted: constant.BOOLEAN_ENUM.FALSE,
            },
          }).then(function (user) {
            if (!user) {
              return callback(1, "wrong_user", 420, "wrong user", null);
            }
            return cb(null, user);
          });
        },
        // update user
        function (user, cb) {
          Player.build(data)
            .validate()
            .then(function () {
              Object.assign(user, data);
              user
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
      return callback(1, "update_user_fail", 400, error, null);
    }
  },

  delete: function (accessUserId, accessUserType, id, callback) {
    try {
      if (accessUserType < constant.USER_TYPE_ENUM.END_USER) {
        return callback(1, "permission_denied", 403, "permission denied", null);
      }

      Player.update(
        {
          deleted: constant.BOOLEAN_ENUM.TRUE,
        },
        {
          where: { id: id },
        }
      )
        .then(function (result) {
          if (!result[0]) {
            return callback(1, "wrong_user", 403, "wrong user", null);
          } else {
            return callback(null, null, 200, null, result);
          }
        })
        .catch(function (error) {
          return callback(true, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "delete_user_fail", 400, error, null);
    }
  },

  login: function (data, callback) {
    try {
      const where = {
        [Sequelize.Op.or]: [{ username: data.username_or_email || "" }, { email: data.username_or_email || "" }],
      };

      Player.findOne({
        where: where,
      })
        .then((user) => {
          if (user) {
            if (user.deleted === constant.BOOLEAN_ENUM.TRUE) {
              return callback(1, "deleted_user", 400, "User has been deleted", null);
            } else if (!user.checkPassword(data.password)) {
              return callback(1, "wrong_password", 400, "Wrong password", null);
            }
            // else if (user.type < constant.USER_TYPE_ENUM.MANAGER) {
            //   return callback(
            //     1,
            //     "permission_denied",
            //     403,
            //     "permission denied",
            //     null
            //   );
            // }
            else {
              return callback(null, null, 200, null, user);
            }
          } else {
            return callback(1, "wrong_user", 400, "Wrong user", null);
          }
        })
        .catch(function (error) {
          return callback(1, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "login_fail", 400, error, null);
    }
  },

  verify: function (token, callback) {
    try {
      if (!token) {
        return callback(1, "invalid_input", 403, "Missing token", null);
      }

      const result = Player.verifyToken(token);
      if (!result) {
        return callback(1, "verify_fail", 400, null, null);
      }

      Player.findOne({
        where: { id: result.id },
      })
        .then((user) => {
          if (user) {
            if (user.deleted === constant.BOOLEAN_ENUM.TRUE) {
              return callback(1, "deleted_user", 400, "User has been deleted", null);
            } else {
              return callback(null, null, 200, null, user);
            }
          } else {
            return callback(1, "wrong_user", 400, "Wrong user", null);
          }
        })
        .catch(function (error) {
          return callback(1, "query_fail", 400, error, null);
        });
    } catch (error) {
      return callback(1, "verify_fail", 400, error, null);
    }
  },
};
