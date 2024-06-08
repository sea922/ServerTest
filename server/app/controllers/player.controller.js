/* eslint-disable no-unused-vars */
// our components
const config = require('../configs/general.config');
const playerManager = require('../managers/player.manager');
const rest = require('../utils/restware.utils');
const constant = require('../utils/constant.utils');

module.exports = {
  create: function(req, res) {
    const data = req.body || '';
    playerManager.create(data, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      const resData = {};
      resData.id = result.id;
      resData.username = result.username;
      resData.displayName = result.displayName;
      resData.email = result.email;
      resData.method = result.method;
      return rest.sendSuccessOne(res, resData, httpCode);
    });
  },
  me: (req, res) => {
    const accessUserId = req.query.accessUserId || "";
    playerManager.me(accessUserId, function (errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      return rest.sendSuccessOne(res, result, httpCode);
    });
  },


  getOne: function(req, res) {
    const accessUserId = req.query.accessUserId || global.INFO.anonymousId;
    const accessUserType = req.query.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const id = req.params.id || '';
    playerManager.getOne(accessUserId, accessUserType, id, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      return rest.sendSuccessOne(res, result, httpCode);
    });
  },

  getAll: function(req, res) {
    const accessUserId = req.query.accessUserId || global.INFO.anonymousId;
    const accessUserType = req.query.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const filter = req.query.filters || '';
    const sort = req.query.sort || '';
    const search = req.query.search || '';
    const pageNumber = req.query.pageNumber || 1;
    const pageSize = req.query.pageSize || Number.MAX_SAFE_INTEGER;
    playerManager.getAll(accessUserId, accessUserType, filter, sort, search, pageNumber, pageSize, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      return rest.sendSuccessMany(res, result, httpCode);
    });
  },

  update: function(req, res) {
    const accessUserId = req.body.accessUserId || global.INFO.anonymousId;
    const accessUserType = req.body.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const id = req.params.id || '';
    const data = req.body || '';
    playerManager.update(accessUserId, accessUserType, id, data, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      const resData = {};
      resData.id = result.id;
      resData.username = result.username;
      resData.displayName = result.displayName;
      resData.email = result.email;
      resData.method = result.method;
      return rest.sendSuccessOne(res, resData, httpCode);
    });
  },

  delete: function(req, res) {
    const accessUserId = req.body.accessUserId || global.INFO.anonymousId;
    const accessUserType = req.body.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const id = req.params.id || '';
    playerManager.delete(accessUserId, accessUserType, id, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      return rest.sendSuccessOne(res, result, httpCode);
    });
  },

  login: function(req, res) {
    const data = req.body || '';
    playerManager.login( data, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      const resData = {};
      resData.id = result.id;
      resData.username = result.username;
      resData.displayName = result.displayName;
      resData.email = result.email;
      resData.method = constant.LOGIN_METHOD_ENUM.TRADITIONAL;
      resData.type = result.type;
      return rest.sendSuccessToken(res, result.generateToken(), resData);
    });
  },

  verify: function(req, res) {
    const token = req.body.token || '';
    playerManager.verify( token, function(errorCode, errorMessage, httpCode, errorDescription, result) {
      if (errorCode) {
        return rest.sendError(res, errorCode, errorMessage, httpCode, errorDescription);
      }
      const resData = {};
      resData.id = result.id;
      resData.username = result.username;
      resData.displayName = result.displayName;
      resData.email = result.email;
      resData.method = constant.LOGIN_METHOD_ENUM.TRADITIONAL;
      resData.type = result.type;
      return rest.sendSuccessToken(res, result.generateToken(), resData);
    });
  },
};
