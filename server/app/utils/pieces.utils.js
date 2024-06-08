
const genLast7Days = function() {
  const result = [];
  const curDate = new Date();
  for (let i=6; i >= 0; i--) {
    const d = new Date(curDate.getTime() - (i * 24 * 60 * 60 * 1000));
    const od = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    result.push( od );
  }
  return result;
};

const genRandomString = function( length ) {
  let sResult = '';
  const sPossible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for ( let i = 0; i < length; i++ ) {
    sResult += sPossible.charAt(Math.floor(Math.random() * sPossible.length));
  }
  return sResult;
};

const genRandom123String = function(length ) {
  let sResult = '';
  const sPossible = '0123456789';

  for ( let i = 0; i < length; i++ ) {
    sResult += sPossible.charAt(Math.floor(Math.random() * sPossible.length));
  }
  return sResult;
};

const safelyParseJSON = function(json) {
  let parsed;
  try {
    parsed = JSON.parse(json || null);
  } catch (e) {
    parsed = null;
  }
  return parsed;
};

const pushArrayIfNotExist = function(objectArray, element) {
  try {
    if ( !objectArray ) {
      objectArray = [];
      objectArray.push(element);
    } else {
      let i;
      for (i = 0; i < objectArray.length; i++) {
        if (objectArray[i].id && element.id && objectArray[i].id.toString() === element.id.toString()) {
          break;
        }
      }
      if (i === objectArray.length) {
        objectArray.push(element);
      }
    }
  } catch (e) {
    return null;
  }
  return objectArray;
};

// add if not exist, if exist -> replace
const pushArrayIfNotExistExt = function(objectArray, key, element ) {
  try {
    if ( !objectArray ) {
      objectArray = [];
      objectArray.push(element);
    } else {
      let i;
      for (i = 0; i < objectArray.length; i++) {
        if (key) {
          if (objectArray[i][key] && element[key] && (objectArray[i][key].toString() === element[key].toString()) ) {
            objectArray.splice(i, 1);
            objectArray.push(element);
            break;
          }
        } else {
          if (objectArray[i] && element && objectArray[i].toString() === element.toString()) {
            objectArray.splice(i, 1);
            objectArray.push(element);
            break;
          }
        }
      }
      if (i === objectArray.length) {
        objectArray.push(element);
      }
    }
  } catch (e) {
    return null;
  }
  return objectArray;
};

const pullArrayIfExist = function(objectArray, elementId) {
  try {
    if (objectArray && objectArray.length > 0) {
      for (let i = 0; i < objectArray.length; i++) {
        const obj = objectArray[i];
        if (obj.id && elementId && obj.id.toString() === elementId.toString()) {
          objectArray.splice(i, 1);
          i--;
        }
      }
    }
  } catch (e) {
    return null;
  }
  return objectArray;
};

const pullArrayIfExistExt = function(objectArray, key, value) {
  try {
    if (objectArray && objectArray.length > 0) {
      for (let i = 0; i < objectArray.length; i++) {
        const obj = objectArray[i];
        if (obj[key] && value && obj[key].toString() === value.toString()) {
          objectArray.splice(i, 1);
          i--;
        }
      }
    }
  } catch (e) {
    return null;
  }
  return objectArray;
};

const pullArrayKeepExist = function(objectArray, key, value) {
  try {
    if (objectArray && objectArray.length > 0) {
      for (let i = 0; i < objectArray.length; i++) {
        const obj = objectArray[i];
        if (obj[key] && value && obj[key].toString() !== value.toString()) {
          objectArray.splice(i, 1);
          i--;
        }
      }
    }
  } catch (e) {
    return null;
  }
  return objectArray;
};

const findInArray = function(objectArray, findKey, findValue, resultKey) {
  let result = null;
  try {
    if (objectArray && objectArray.length > 0) {
      for (let i = 0; i < objectArray.length; i++) {
        const obj = objectArray[i];
        if (obj[findKey] && findValue && obj[findKey].toString() === findValue.toString()) {
          result = obj[resultKey];
          break;
        }
      }
    }
  } catch (e) {
    return null;
  }
  return result;
};

const getClientIP = function(req) {
  let result = null;
  try {
    result = (req.headers['x-forwareded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress);
    if (result) {
      result = result.split(',')[0];
    }
    return result;
  } catch (e) {
    return null;
  }
};

const dateDiffByMonths = function(FirstDate, SecondDate) {
  let iMonths;
  iMonths = (SecondDate.getFullYear() - FirstDate.getFullYear()) * 12;
  iMonths -= FirstDate.getMonth() + 1;
  iMonths += SecondDate.getMonth();
  return iMonths <= 0 ? 0 : iMonths;
};

const dateDiffByHours = function(FirstDate, SecondDate) {
  return ( Math.abs(SecondDate - FirstDate) / 36e5 );
};

const dateDiffByDays = function(FirstDate, SecondDate) {
  return (Math.abs(SecondDate - FirstDate) / 8.64e7);
};

const dateDiffByYears = function(FirstDate, SecondDate) {
  return ( SecondDate.getFullYear() - FirstDate.getFullYear() );
};

/**
 *  This function generate the filter for query",
 * @param {Number} degrees",
 * @param {Number} minutes",
 * @param {Number} seconds",
 * @param {String} direction",
 * @return {number}
 */
const convertDMSToDD = function(degrees, minutes, seconds, direction) {
  let dd = degrees + (minutes/60) + (seconds/3600);

  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  }
  return dd;
};

const pageableV2 = function (
  pageNumber = 1,
  pageSize = Number.MAX_SAFE_INTEGER,
  length = 5
) {
  pageNumber = parseInt(pageNumber) || 1;
  pageSize = parseInt(pageSize) || Number.MAX_SAFE_INTEGER;

  // count of page show
  length = parseInt(length);

  let currentPage;
  let prevPage;
  let nextPage;
  let totalPage;
  let beginPage;
  let endPage;
  let hasPrevPage;
  let hasNextPage;
  let listPage = [];

  totalPage = Math.ceil(length / pageSize);

  currentPage = pageNumber;
  currentPage = currentPage <= totalPage ? currentPage : totalPage;
  currentPage = currentPage >= 1 ? currentPage : 1;

  prevPage = currentPage - 1;
  prevPage = prevPage >= 1 ? prevPage : null;

  hasPrevPage = prevPage ? prevPage > 1 : false;

  nextPage = currentPage + 1;
  nextPage = nextPage <= totalPage ? nextPage : null;

  hasNextPage = nextPage ? nextPage < totalPage : false;

  if (currentPage <= totalPage - Math.floor(length / 2)) {
    beginPage = currentPage - Math.floor(length / 2);
    beginPage = beginPage >= 1 ? beginPage : 1;

    endPage = beginPage + (length - 1);
    endPage = endPage <= totalPage ? endPage : totalPage;
  } else {
    endPage = currentPage + Math.floor(length / 2);
    endPage = endPage <= totalPage ? endPage : totalPage;

    beginPage = endPage - (length - 1);
    beginPage = beginPage >= 1 ? beginPage : 1;
  }

  for (let i = beginPage; i <= endPage; i++) {
    listPage.push(i);
  }
  hasPrevPage = currentPage - 1 > 0
  hasNextPage = !(currentPage + 1 > totalPage)

  return {
    currentPage: currentPage,
    prevPage: prevPage,
    nextPage: nextPage,
    beginPage: beginPage,
    endPage: endPage,
    listPage: listPage,
    totalPage: totalPage,
    hasPrev: hasPrevPage,
    hasNext: hasNextPage,
  };
};

module.exports = {
  pullArrayKeepExist,
  pushArrayIfNotExist,
  pushArrayIfNotExistExt,
  pullArrayIfExist,
  pullArrayIfExistExt,
  genRandomString,
  genRandom123String,
  safelyParseJSON,
  findInArray,
  getClientIP,
  dateDiffByMonths,
  dateDiffByHours,
  dateDiffByDays,
  dateDiffByYears,
  genLast7Days,
  convertDMSToDD,
  pageableV2
};
