const Logger = require('./logger.utils');

const sendSuccessOne = function(res, data, iHttpCode) {
  if (!res) {
    return;
  }

  const httpStatus = iHttpCode ? iHttpCode : 200;
  const out = {};

  if (data) {
    out.data = data;
  }

  out.message = '';
  out.result = 'ok';

  res.status(httpStatus);
  res.contentType('json');

  Logger.info(out);
  return res.json(out);
};

const sendSuccessMany = function(res, data, iHttpCode) {
  if (!res) {
    return;
  }

  const httpStatus = iHttpCode ? iHttpCode : 200;
  let out = {};
  if (data) {
    out = data;
  }

  out.message = '';
  out.result = 'ok';

  res.status(httpStatus);
  res.contentType('json');

  Logger.info(out);
  return res.json(out);
};

const sendSuccessDownload = function(res, path) {
  if (!res) {
    res.status(400);
    res.contentType('json');
    const out = {};
    out.result = 'fail';
    out.message = 'system error';

    Logger.debug(out);
    return res.json(out);
  }
  try {
    return res.redirect(path);
  } catch (error) {
    res.status(400);
    res.contentType('json');
    const out = {};
    out.result = 'fail';
    out.message = 'system error';
    out.desc = error;

    Logger.error(out);
    return res.json(out);
  }
};

const sendSuccessWebContent = function(res, data, iHttpCode) {
  if (!res) {
    return;
  }

  const httpStatus = iHttpCode ? iHttpCode : 200;
  let out = {};

  if ( data ) {
    out = data;
  }

  res.status(httpStatus);
  res.contentType('text/html');

  Logger.info(out);
  return res.end(out);
};

const sendSuccessToken = function(res, token, data) {
  if (!res) {
    return;
  }
  const out = {};

  data.token = token;

  out.data = data;
  out.message = '';
  out.result = 'ok';

  res.status(200);
  res.contentType('json');

  Logger.info(out);
  return res.json(out);
};

const sendError = function(res, errorCode, errorMes, httpCode, errorDesc, data) {
  if (!res) {
    return;
  }

  const out = {};
  out.result = 'fail';
  out.code = errorCode;
  out.error = errorMes ? errorMes : null;

  if (data) {
    out.data = data;
  }

  out.all = errorDesc?.message || errorDesc;

  const status = httpCode ? httpCode : 500;

  res.status(status);
  res.contentType('json');

  Logger.error(out);
  return res.json(out);
};

const sendRaw = function(res, data, iHttpCode) {
  if (!res) {
    return;
  }

  const httpStatus = iHttpCode ? iHttpCode : 200;
  const out = data;

  res.status(httpStatus);
  res.contentType('json');

  Logger.info(out);
  return res.json(out);
};

module.exports = {
  sendSuccessOne,
  sendSuccessMany,
  sendError,
  sendSuccessToken,
  sendSuccessDownload,
  sendSuccessWebContent,
  sendRaw,
};
