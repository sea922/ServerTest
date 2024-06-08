const path = require('path');
const winston = require('winston');
const moment = require('moment-timezone');

const config = require('../configs/general.config');
const constant = require('../utils/constant.utils');

// allow log level -> 0: disable, 1 -> error, 2 -> debug, 3 -> info
const enableLog = config.enableLog;

winston.level = config.enableLog;

class Logger {
  static _createLogger (type) {
    const filename = moment().tz(config.timezone).format('YYYY-MM-DD') + `_${type || ''}`;
    return winston.createLogger({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(({ level, message}) => {
          let log = '', detail = '';
          if(message.log){
            if(message.log instanceof Error){
              log =  JSON.stringify(message.log, ['message', 'stack']);
            } else {
              log =  JSON.stringify(message.log);
            }
          }
          if(message.detail){
            if(message.detail instanceof Error){
              detail =  JSON.stringify(message.detail, ['message', 'stack']);
            } else {
              detail =  JSON.stringify(message.detail);
            }
          }
          return `[${moment().format()}] [${level.toUpperCase()}]: ${log} ${detail}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.resolve('.logs',  filename + '.log')})
      ]
    })
  } 

  static info(log, detail, type) {
    if (enableLog >= constant.LOG_LEVEL_ENUM.INFO) {
      const logger = Logger._createLogger(type);
      logger.info({ log, detail });

      // log daily
      const daily = Logger._createLogger();
      daily.info({ log, detail });
    }
  }

  static debug(log, detail, type) {
    if (enableLog >= constant.LOG_LEVEL_ENUM.DEBUG) {
      const logger = Logger._createLogger(type);
      logger.debug({ log, detail });

      // log daily
      const daily = Logger._createLogger();
      daily.debug({ log, detail });
    }
  }

  static error(log, detail, type) {
    if (enableLog >= constant.LOG_LEVEL_ENUM.ERROR) {
      const logger = Logger._createLogger(type);
      logger.error({ log, detail });

      // log daily
      const daily = Logger._createLogger();
      daily.error({ log, detail });
    }
  }

  // logger for ARCHIVE
  static ARCHIVE = {
    info: (log, detail) => { Logger.info(log, detail, constant.JOB_TYPE_ENUM.ARCHIVE)},
    debug: (log, detail) => { Logger.debug(log, detail, constant.JOB_TYPE_ENUM.ARCHIVE)},
    error: (log, detail) => { Logger.error(log, detail, constant.JOB_TYPE_ENUM.ARCHIVE)},
  }

  // logger for RESTORE
  static RESTORE = {
    info: (log, detail) => { Logger.info(log, detail, constant.JOB_TYPE_ENUM.RESTORE)},
    debug: (log, detail) => { Logger.debug(log, detail, constant.JOB_TYPE_ENUM.RESTORE)},
    error: (log, detail) => { Logger.error(log, detail, constant.JOB_TYPE_ENUM.RESTORE)},
  }
}

module.exports = Logger;
