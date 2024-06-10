/* eslint-disable no-unused-vars */
// our components
const config = require("../configs/general.config");
const playerInventoryManager = require("../managers/playerInventory.manager");
const rest = require("../utils/restware.utils");
const constant = require("../utils/constant.utils");

module.exports = {
  create: function (req, res) {
    const data = req.body || "";
    const accessUserId = req.body.accessUserId || global.INFO.anonymousId;
    const accessUserType =
      req.body.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
      playerInventoryManager.create(
      accessUserId,
      accessUserType,
      data,
      function (errorCode, errorMessage, httpCode, errorDescription, result) {
        if (errorCode) {
          return rest.sendError(
            res,
            errorCode,
            errorMessage,
            httpCode,
            errorDescription
          );
        }
        const resData = {};
        resData.id = result.id;
        resData.carId = result.carId;
        resData.criteriaId = result.criteriaId;
        resData.note = result.note;
        return rest.sendSuccessOne(res, resData, httpCode);
      }
    );
  },

  getOneItemOfPlayer: function (req, res) {
    const accessUserId = req.query.accessUserId || global.INFO.anonymousId;
    const accessUserType =
      req.query.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const id = req.params.id || "";
    playerInventoryManager.getOneItemOfPlayer(
      accessUserId,
      accessUserType,
      id,
      function (errorCode, errorMessage, httpCode, errorDescription, result) {
        if (errorCode) {
          return rest.sendError(
            res,
            errorCode,
            errorMessage,
            httpCode,
            errorDescription
          );
        }
        return rest.sendSuccessOne(res, result, httpCode);
      }
    );
  },

  getAllPlayerItems: function (req, res) {
    const accessUserId = req.query.accessUserId || global.INFO.anonymousId;
    const accessUserType =
      req.query.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const filter = req.query.filters || "";
    const sort = req.query.sort || "";
    const search = req.query.search || "";
    const pageNumber = req.query.pageNumber || 1;
    const pageSize = req.query.pageSize || Number.MAX_SAFE_INTEGER;
    playerInventoryManager.getAllPlayerItems(
      accessUserId,
      accessUserType,
      filter,
      sort,
      search,
      pageNumber,
      pageSize,
      function (errorCode, errorMessage, httpCode, errorDescription, result) {
        if (errorCode) {
          return rest.sendError(
            res,
            errorCode,
            errorMessage,
            httpCode,
            errorDescription
          );
        }
        return rest.sendSuccessMany(res, result, httpCode);
      }
    );
  },

  sellItems: function (req, res) {
    const accessUserId = req.body.accessUserId || global.INFO.anonymousId;
    const accessUserType =
      req.body.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const data = req.body || "";
    playerInventoryManager.sellItems(
      accessUserId,
      accessUserType,
      data,
      function (errorCode, errorMessage, httpCode, errorDescription, result) {
        if (errorCode) {
          return rest.sendError(
            res,
            errorCode,
            errorMessage,
            httpCode,
            errorDescription
          );
        }
        const resData = {};
        resData.item_id = result.itemId;
        resData.player_id = result.playerId;
        resData.quantity = result.quantity;
        return rest.sendSuccessOne(res, resData, httpCode);
      }
    );
  },

  buyItems: function (req, res) {
    const accessUserId = req.body.accessUserId || global.INFO.anonymousId;
    const accessUserType =
      req.body.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const data = req.body || "";
    playerInventoryManager.buyItems(
      accessUserId,
      accessUserType,
      data,
      function (errorCode, errorMessage, httpCode, errorDescription, result) {
        if (errorCode) {
          return rest.sendError(
            res,
            errorCode,
            errorMessage,
            httpCode,
            errorDescription
          );
        }
        const resData = {};
        resData.item_id = result.itemId;
        resData.player_id = result.playerId;
        resData.quantity = result.quantity;
        return rest.sendSuccessOne(res, resData, httpCode);
      }
    );
  },

  delete: function (req, res) {
    const accessUserId = req.body.accessUserId || global.INFO.anonymousId;
    const accessUserType =
      req.body.accessUserType || constant.USER_TYPE_ENUM.ANONYMOUS;
    const id = req.params.id || "";
    playerInventoryManager.delete(
      accessUserId,
      accessUserType,
      id,
      function (errorCode, errorMessage, httpCode, errorDescription, result) {
        if (errorCode) {
          return rest.sendError(
            res,
            errorCode,
            errorMessage,
            httpCode,
            errorDescription
          );
        }
        return rest.sendSuccessOne(res, result, httpCode);
      }
    );
  },
};
