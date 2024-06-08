/**
 * Created by s3lab. on 1/13/2017.
 */
'use strict';

const validator = require('validator');

/**
 * check value is a valid type",
 * @param {String} value"
 * @param {String} type: string, number, object, function, undefined, boolean"
 * @param {Integer} length"
 * @return {boolean}
 */
const validType = function(value, type, length = 1) {
  let minLength = 0;
  if (length !== null && length !== undefined) {
    minLength = length;
  }
  return !(typeof value !== type || value == null || value.length < minLength);
};

/**
 * check value is a valid type",
 * @param {String} value"
 * @param {Integer} minLength"
 * @param {Integer} maxLength"
 * @return {boolean}
 */
const validStringType = function(value, minLength = 1, maxLength = 10000) {
  return !(typeof value !== 'string' || value.length < minLength || value.length > maxLength);
};

/**
 * check param is a valid object enum",
 * @param {String} value"
 * @param {Object} options"
 * @return {boolean}
 */
const validOptionValueEnum = function(value, options) {
  let result = false;
  for (const propertyName in options) {
    if (value == options[propertyName]) {
      result = true;
      break;
    }
  }
  return result;
};

/**
 * check param is a valid object enum",
 * @param {String} key"
 * @param {String} value"
 * @param {Object} options"
 * @return {number}
 */
const validOptionEnum = function(key, value, options) {
  let result = 0;
  for (const propertyName in options) {
    if (value === options[propertyName] && key === propertyName) {
      result = 3;
      break;
    } else {
      if (key === propertyName) {
        result = 1;
        break;
      } else if (value === options[propertyName]) {
        result = 2;
        break;
      }
    }
  }
  return result;
};

/**
 * check param is a valid number",
 * @param {String} value"
 * @return {boolean}
 */
const validNumberParam = function(value) {
  let result = true;
  if (!(validType(value, 'string') && validator.isInt(value)) && !validType(value, 'number')) {
    result = false;
  }
  return result;
};

/**
 * check param is a valid decimal",
 * @param {String} value"
 * @return {boolean}
 */
const validDecimalParam = function(value) {
  let result = true;
  if (!(validType(value, 'string') && validator.isDecimal(value)) && !validType(value, 'number')) {
    result = false;
  }
  return result;
};

/**
 * check param is a valid Date",
 * @param {String} value"
 * @return {boolean}
 */
const validDateParam = function(value) {
  let result = true;
  if (!(validType(value, 'string') && validator.isISO8601(value))) {
    result = !isNaN(Date.parse(value));
  }
  return result;
};

  /**
   * check param is a valid number",
   * @param {String} value"
   * @return {boolean}
   */
  const validJson = function(value) {
    let result = true;
    if (!(validType(value, 'string') && validator.isJSON(value))) {
      result = false;
    }
    return result;
  };

/**
 * This function check a json array has duplicate data or not",
 * @param {Object} value",
 * @return {String}
 */
const unDuplicateJsonArray = function(value) {
  let result = true;
  if (!(validType(value, 'string') && validator.isJSON(value))) {
    result = false;
  } else {
    const data = JSON.parse(value);
    result = new Set(data).size === data.length;
  }
  return result;
};

module.exports = {
  validType,
  validStringType,
  validOptionEnum,
  validOptionValueEnum,
  validNumberParam,
  validDateParam,
  validDecimalParam,
  validJson,
  unDuplicateJsonArray,
};
