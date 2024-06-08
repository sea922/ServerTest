// third party components
const jsonWebToken = require('jsonwebtoken');

// our components
const config = require('../configs/general.config');
const resLayer = require('../utils/restware.utils');

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return resLayer.sendSuccessOne(res, {}, 200);
  }

  if (global.INFO.setting['SERVER_MAINTENANCE'] && global.INFO.setting['SERVER_MAINTENANCE'] === '1') {
    const resData = {};
    resData.code = 0;
    resData.message = 'Server Maintenance';
    return resLayer.sendSuccessOne(res, resData, 503);
  }

  const authorization = req.headers["authorization"];
  const token = (req.body && req.body.access_token) || req.headers['access_token'] || req.headers['x-access-token'] || (req.query && req.query.access_token) || (authorization && authorization.replace("Bearer ", ""));


  if (token) {
    try {
      jsonWebToken.verify(token, config.jwtAuthKey, function(error, decoded) {
        if (error) {
          return resLayer.sendError(res, 70, 'verify_token_fail', 400, error);
        }

        if (req.method === 'GET') {
          req.query.accessUserId = decoded.id;
          req.query.accessUserType = decoded.type;
          req.query.accessUsername = decoded.Username;
          req.query.accessMethod = decoded.method;
        } else {
          req.body.accessUserId = decoded.id;
          req.body.accessUserType = decoded.type;
          req.body.accessUsername = decoded.Username;
          req.body.accessMethod = decoded.method;
        }
        next();
      });
    } catch (error) {
      return resLayer.sendError(res, 4170, 'system', 400, error);
    }
  } else {
    return resLayer.sendError(res, 4178, 'invalid_token', 400, null);
  }
};
