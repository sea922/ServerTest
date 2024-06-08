const constant = require('../utils/constant.utils');

module.exports = {
  // support HTTPS or not
  https: false,
  // allow log level (ERROR: 0, WARN: 1, INFO: 2, HTTP: 3, VERBOSE: 4, DEBUG: 5, SILLY: 6)
  enableLog: constant.LOG_LEVEL_ENUM.INFO,
  // allow job scheduler
  enableScheduler: process.env.ENABLE_SCHEDULER,
  // allow automatically creating folder when init
  autoCreateFolder: true,
  // allow automatically clean tmp folder in period
  autoCleanTmp: false,
  // period for cleaning tmp folder: every 6 hours
  crontabCleanTmp: '0 0 */6 * * *',
  // login token expired time
  tokenLoginExpiredDays: '25 days',
  // temporal token (for reset password, verify email) expired time
  tokenTmpExpiredDays: '1 days',
  appName: process.env.name,
  port: process.env.NODE_PORT || 7500,
  apiUrl: process.env.API_ROOT_URL || 'http://localhost',
  webUrl: process.env.WEB_ROOT_URL || '',
  storageUrl: process.env.STORAGE_ROOT_URL || '',
  jwtAuthKey: 'fdhjfdfuejfkjdhfaueyruesfhjs',
  internalServerKey: 'fdhjfdfuejfkjiuhhhgtwckkusfhjs',
  sockIOAuthKey: 'fhskjfenfnhpploemjase',
  paths: {
    public: '/public',
    tmp: '/tmp',
    storage: '/mnt/storage/',
    snapshot: '/snapshot',
    avatar: '/public/avatar',
    docs: '/docs',
    jobs: '/app/jobs',
  },
  timezone: 'Asia/Seoul',
};
