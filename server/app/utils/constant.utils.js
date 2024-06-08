/**
 * Created by s3lab. on 1/17/2017.
 */
const BOOLEAN_ENUM = {
  TRUE: true,
  FALSE: false,
};

const STATUS_ENUM = {
  ENABLE: 1,
  DISABLE: 2,
  DELETED: 3,
};

const USER_TYPE_ENUM = {
  ANONYMOUS: 1,
  END_USER: 2,
  MECHANICAL: 3,
  ADMINISTRATOR: 4,
  SUPER_ADMIN: 5,
};

const DATA_TYPE_ENUM = {
  BOOLEAN: 1,
  STRING: 2,
  DATE: 3,
  INTEGER: 4,
  DECIMAL: 5,
  INTEGER_OPTIONS: 6,
  STRING_OPTIONS: 7,
};

const ACTION_ENUM = {
  VIEW: "V",
  UPDATE: "U",
  DELETE: "D",
};

const PERMISSION_ENUM = {
  VIEW: 1,
  UPDATE: 2,
  CLONE: 4,
  DELETE: 8,
  DESTROY: 16,
  RESTORE: 32,
  CREATE: 64,
};

const LANGUAGE_ENUM = {
  KOREAN: "ko",
  VIETNAMESE: "vn",
  ENGLISH: "en",
  JAPANESE: "jn",
  CHINESE: "cn",
};

const WARN_ENUM = {
  INFORMATION: 1,
  WARNING: 2,
  SERIOUS: 3,
  EMERGENT: 4,
};

const FILTER_OPERATOR_ENUM = {
  "=": "eq",
  "!=": "ne",
  "<": "lt",
  ">": "gt",
  "<=": "lte",
  ">=": "gte",
  in: "in",
  between: "between",
  like: "like",
};

const TASK_STATUS_ENUM = {
  CREATED: "created",
  WAITING: "waiting",
  INTIATING: "Initiating",
  PROCESSING: "processing",
  COMPLETE: "complete",
  ERROR: "error",
  CANCEL: "cancel",
};

const LOGIN_METHOD_ENUM = {
  GOOGLE: 1,
  NAVER: 2,
  KAKAO: 3,
  FACEBOOK: 4,
  TRADITIONAL: 5,
};

const STORAGE_PROTOCOL_ENUM = {
  SAN: "SAN",
  NAS: "NAS",
  FTP: "FTP",
  SMTP: "SMPT",
  S3G: "S3G",
};

const REPOSITORY_TYPE_ENUM = {
  STORAGE: 1,
  TAPE: 2,
  CLOUD: 3,
};

const JOB_TYPE_ENUM = {
  ARCHIVE: "archive",
  RESTORE: "restore",
  DELETE: "delete",
  INVENTORY: "inventory",
  TAPE_IN: "tape_in",
  TAPE_OUT: "tape_out",
};

const TASK_TYPE_ENUM = {
  MMA: "MMA",
  MTM: "MTM",
  ACTOR: "actor",
  S3G: "s3g",
  LM: "LM",
};

const MEDIA_TYPE_ENUM = {
  UNKNOW: 0,
  VIDEO: 1,
  AUDIO: 2,
  IMAGE: 3,
  TEXT: 4,
  ZIP: 5,
};

const CLOUD_PROTOCOL_ENUM = {
  S3G: "S3G",
};

const WORKFLOW_NODE_TYPE = {
  RESPOSITORY: 1,
  ACTION: 2,
};

const JOB_STATUS_ENUM = {
  PROCESSING: "processing",
  COMPLETE: "complete",
  ERROR: "error",
  CANCEL: "cancel",
};

const TASK_SEND_METHOD_ENUM = {
  ACTIVEMQ: 1,
  SOCKETIO: 2,
};

const TAPE_STATUS_ENUM = {
  INSERTING: "inserting",
  EJECTING: "ejecting",
  READY: "ready",
  UNREADY: "unready",
};

const LIBIRARY_STATUS_ENUM = {
  CHECKING: "checking",
  READY: "ready",
  UNREADY: "unready",
};

const TAPE_LOCATION_EMUM = {
  DRIVE: "drive",
  OUTSIDE: "outside",
  STORAGE_AREA: "storage_area",
  IE_AREA: "ie_area",
};

const LOG_LEVEL_ENUM = {
  ERROR: 1,
  WARN: 2,
  DEBUG: 3,
  INFO: 4,
};

const OS_ENUM = {
  WINDOW: 1,
  LINUX: 2,
  MACOS: 3,
};

const LTO_VERSION_ENUM = {
  V1: "LTO_V1",
  V2: "LTO_V2",
  V3: "LTO_V3",
  V4: "LTO_V4",
  V5: "LTO_V5",
  V6: "LTO_V6",
  V7: "LTO_V7",
  V8: "LTO_V8",
  V8: "LTO_V9",
};

const DRIVE_VERSION_ENUM = {
  V1: "DRIVE_V1",
  V2: "DRIVE_V2",
  V3: "DRIVE_V3",
  V4: "DRIVE_V4",
  V5: "DRIVE_V5",
  V6: "DRIVE_V6",
  V7: "DRIVE_V7",
  V8: "DRIVE_V8",
  V8: "DRIVE_V9",
};

const LTO_VERSION_ALLOW_VALUE = {
  NO_READ_NO_WRITE: 0,
  ONLY_READ: 1,
  ONLY_WRITE: 2,
  READ_WRITE: 3,
};

const TAPE_SAFE_AMOUNT = 104857600; // 100 MB
const TAPE_DEFAUL_CAPACITY = 1099511627776; // 1 TB
const DEFAULT_TAPE_GROUP = 1;
const DEFAULT_LIBRARY_GROUP = 1;

module.exports = {
  STATUS_ENUM,
  LOGIN_METHOD_ENUM,
  TASK_STATUS_ENUM,
  USER_TYPE_ENUM,
  ACTION_ENUM,
  WARN_ENUM,
  LANGUAGE_ENUM,
  FILTER_OPERATOR_ENUM,
  DATA_TYPE_ENUM,
  BOOLEAN_ENUM,
  PERMISSION_ENUM,
  STORAGE_PROTOCOL_ENUM,
  CLOUD_PROTOCOL_ENUM,
  REPOSITORY_TYPE_ENUM,
  JOB_TYPE_ENUM,
  TASK_TYPE_ENUM,
  MEDIA_TYPE_ENUM,
  WORKFLOW_NODE_TYPE,
  JOB_STATUS_ENUM,
  TASK_SEND_METHOD_ENUM,
  TAPE_STATUS_ENUM,
  LIBIRARY_STATUS_ENUM,
  TAPE_LOCATION_EMUM,
  LOG_LEVEL_ENUM,
  OS_ENUM,
  LTO_VERSION_ENUM,
  TAPE_SAFE_AMOUNT,
  DRIVE_VERSION_ENUM,
  LTO_VERSION_ALLOW_VALUE,
  TAPE_DEFAUL_CAPACITY,
  DEFAULT_TAPE_GROUP,
  DEFAULT_LIBRARY_GROUP,
};
