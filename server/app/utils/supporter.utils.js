const {Op} = require('sequelize');
const fsExtra = require('fs-extra');

const validator = require('validator');
const constant = require('./constant.utils');
const config = require('../configs/general.config');
const Logger = require('./logger.utils');

/**
 * This function copy file depend on the storage type",
 * @param {String} src",
 * @param {String} dest",
 * @param {String} mimetype",
 * @param {function} callback"
 */

const copyFile = function (src, dest, mimetype, callback) {
	fsExtra.copy(src, dest, {overwrite: true}, function (error) {
		if (error) {
			return callback('copy_error', error);
		}
		return callback(null, null);
	});
};

/**
 * This function delete file depend on the storage type",
 * @param {String} dest",
 * @param {function} callback"
 */

const delFile = function (dest, callback) {
	fsExtra.pathExists(dest, (error, exists) => {
		if (error) {
			Logger.error(error);
			return callback('delete_fail', error);
		}
		if (exists) {
			fsExtra.remove(dest)
				.then(() => {
					return callback(null, null);
				})
				.catch((error) => {
					Logger.error(error);
					return callback('delete_fail', error);
				});
		} else {
			return callback(null, null);
		}
	});
};

/**
 * This function generate the random filename from the original file name",
 * @param {String} fileName",
 * @return {string}
 */

const genUniqueFileName = function (fileName) {
	return Date.now() + fileName;
};

/**
 * This function get tmp folder path",
 * @return {string}
 */

const getTmpFolderPath = function () {
	return global.INFO.rootPath + config.paths.tmp;
};

/**
 * This function gen a unique file name in tmp folder path",
 * @param {String} fileName",
 * @return {string}
 */

const genTmpUniqueFilePath = function (fileName) {
	return getTmpFolderPath() + '/' + genUniqueFileName(fileName);
};

/**
 * This function generate the avatar path",
 * @param {String} root",
 * @param {String} path",
 * @param {Integer} id",
 * @param {Boolean} defaultAvatar",
 * @return {String}
 */
const genAvatarPath = function (root, path, id, defaultAvatar) {
	if (defaultAvatar === true) {
		return root + path + '/' + 'default_avatar_128x128.png';
	} else {
		return root + path + '/' + id + '.png';
	}
};

/**
 * This function generate the avatar path",
 * @param {String} root",
 * @param {String} path",
 * @param {Integer} id",
 * @param {Boolean} defaultAvatar",
 * @return {String}
 */
const genLogoPath = function (root, path, id, defaultAvatar) {
	if (defaultAvatar === true) {
		return root + path + '/' + 'default_logo.svg';
	} else {
		return root + path + '/' + id + '.svg';
	}
};

/**
 * Get date string from date object
 * @return {string}
 * @param {Date} dateObj
 */
const getStringDateFromObj = (dateObj) => {
	const month = dateObj.getUTCMonth() + 1; // months from 1-12
	const day = dateObj.getUTCDate();
	const year = dateObj.getUTCFullYear();

	return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
};

const loadJsonFile = function (filePath) {
	if (!fsExtra.pathExistsSync(filePath)) {
		return null;
	} else {
		return JSON.parse(fsExtra.readFileSync(filePath, {encoding: 'utf8', flag: 'r'}) || null);
	}
};

const saveJsonFile = function (filePath, data) {
	const txtData = JSON.stringify(data);
	fsExtra.writeFileSync(filePath, txtData);
};


// ====================================================================== //
const joinPath = function (os, cloud = false, ...pathSegments) {
	let separator = '';
	if (!cloud) {
		if (os === constant.OS_ENUM.WINDOW) {
			separator = '\\';
		} else if (os === constant.OS_ENUM.LINUX || os === constant.OS_ENUM.MACOS) {
			separator = '/';
		}
	}

	// remove all '\' or '/' at start and ennd of every path segment
	if (cloud) {
		pathSegments = pathSegments.map((seg) => seg.trim());
	} else {
		pathSegments = pathSegments.map((seg) => seg.trim().replace(/^[\\/]+|[\\/]+$/g, ''));
	}

	// replace path segments to correct separator
	if (!cloud) {
		if (separator == '\\') {
			pathSegments = pathSegments.map((seg) => seg.trim().replaceAll('/', '\\'));
		} else if (separator == '/') {
			pathSegments = pathSegments.map((seg) => seg.trim().replaceAll('\\', '/'));
		}
	}

	return pathSegments.join(separator);
};

const pasteFilterQuery = function (model, query, filters) {
	if (!query) {
		query = {};
	}

	if (!filters) {
		filters = [];
	}

	const filterAttributes = model.getAttributesForFilter ? model.getAttributesForFilter() : [];
	if (typeof filters === 'string' && validator.isJSON(filters)) {
		filters = JSON.parse(filters || null) || [];
	}

	if (filters.length > 0) {
		if (!query.where) {
			query.where = {};
		}
		for (const filter of filters) {
			const key = filter.key;
			const operator = constant.FILTER_OPERATOR_ENUM[filter.operator];
			const value = filter.value;

			if (!(filterAttributes.includes(key))) {
				throw new Error(`[filter] invalid key '${key}'`);
			}
			if (!operator) {
				throw new Error(`[filter] invalid operator '${operator}'`);
			}

			query.where[key] = {
				[Op[operator]]: value,
			};
		}
	}
	return query;
};

const pasteSortQuery = function (model, query, sort = '') {
	if (!query) {
		query = {};
	}

	// remove space
	sort = sort.replaceAll(' ', '');
	// split to array
	const sortList = sort.split(',');

	const sortAttributes = model.getAttributesForSort ? model.getAttributesForSort() : [];

	if (sortList.length > 0) {
		query.order = [];
		for (let sortItem of sortList) {
			let order = 'asc';
			if (sortItem.startsWith('-')) {
				order = 'desc';
				sortItem = sortItem.replaceAll('-', ''); // remove order character "-"
			} else
				if (sortItem.startsWith('+')) {
					order = 'asc';
					sortItem = sortItem.replaceAll('+', ''); // remove order character "+"
				}

			if (sortItem && !(sortAttributes.includes(sortItem))) {
				throw new Error(`[sort] invalid key '${sortItem}'`);
			}

			// push order item
			if (sortItem) {
				query.order.push([sortItem, order]);
			}
		}
	}

	return query;
};

const pasteSearchQuery = function (model, query, keyword, isSensitive = false) {
	if (keyword && keyword.trim()) {
		if (!query) {
			query = {};
		}

		if (!query.where) {
			query.where = {};
		}

		// operator ilike in case insensitive
		// operator like in case sensitive
		const operator = isSensitive ? Op.like : Op.iLike;

		const searchFields = model.getAttributesForSearch ? model.getAttributesForSearch() : [];

		const conditions = [];

		for (const searchField of searchFields) {
			conditions.push({
				[searchField]: {
					[operator]: '%' + keyword + '%',
				},
			});
		}
		query.where[Op.or] = conditions;
	}

	return query;
};

const pastePaginationQuery = function (query, pageNumber, pageSize) {
	pageSize = parseInt(pageSize);
	pageNumber = parseInt(pageNumber);
	if (!query) {
		query = {};
	}
	query.limit = pageSize;
	query.offset = pageSize * (pageNumber - 1);
	return query;
};

const pasteQuery = function (model, query, filter, sort, search, pageNumber, pageSize, pageCount = 5) {

	console.log(filter);
	pasteFilterQuery(model, query, filter);
	pasteSortQuery(model, query, sort);
	pasteSearchQuery(model, query, search);
	pastePaginationQuery(query, pageNumber, pageSize, pageCount);
	return query;
};

const paginationResult = function (results, pageNumber, pageSize, pageCount) {
	pageSize = parseInt(pageSize);
	pageNumber = parseInt(pageNumber);

	if (Array.isArray(results)) {
		results = {
			count: results.length,
			rows: results.splice(pageSize * (pageNumber - 1), pageSize),
		};
	} else
		if (!results) {
			results = {
				count: 0,
				rows: [],
			};
		}

	const items = results.rows;
	const pagination = {
		prev: null,
		current: pageNumber,
		next: null,
		pages: [],
		total: Math.ceil(results.count / pageSize),
	};

	pagination.prev = (pagination.current - 1 >= 1) ? (pagination.current - 1) : 1;
	pagination.next = (pagination.current + 1 <= pagination.total) ? (pagination.current + 1) : pagination.total;

	let fromPage; let toPage;
	if (pagination.current <= pagination.total - Math.floor(pageCount / 2)) {
		fromPage = pagination.current - Math.floor(pageCount / 2);
		fromPage = (fromPage >= 1) ? fromPage : 1;
		toPage = fromPage + pageCount - 1;
		toPage = (toPage <= pagination.total) ? toPage : pagination.total;
	} else {
		toPage = pagination.current + Math.floor(pageCount / 2);
		toPage = (toPage <= pagination.total) ? toPage : pagination.total;
		fromPage = toPage - pageCount + 1;
		fromPage = (fromPage >= 1) ? fromPage : 1;
	}

	for (let i = fromPage; i <= toPage; i++) {
		pagination.pages.push(i);
	}

	return {
		items: items,
		pagination: pagination,
	};
};

module.exports = {
	genAvatarPath,
	genLogoPath,
	copyFile,
	delFile,
	genUniqueFileName,
	getTmpFolderPath,
	genTmpUniqueFilePath,
	getStringDateFromObj,
	loadJsonFile,
	saveJsonFile,

	joinPath,
	pasteFilterQuery,
	pasteSortQuery,
	pasteSearchQuery,
	pastePaginationQuery,
	pasteQuery,
	paginationResult,
};
