// third party components
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const basename = path.basename(__filename);

// our components
const resLayer = require('../utils/restware.utils');
const logger = require('../utils/logger.utils');
const config = require('../configs/general.config');

module.exports = function(app) {
  // require route files
  fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file !== basename) && (file.endsWith('.route.js'));
      })
      .forEach((file) => {
        require(path.join(__dirname, file))(app);
      });

  // // generate system folders (tmp, public, storage)
  // try {
  //   if (config.autoCreateFolder === true) {
  //     const tmp = global.INFO.rootPath + config.paths.tmp;
  //     const pub = global.INFO.rootPath + config.paths.public;
  //     const storage = global.INFO.rootPath + config.paths.storage;

  //     fsExtra.ensureDirSync(tmp);
  //     fsExtra.ensureDirSync(pub);
  //     fsExtra.ensureDirSync(storage);
  //   }
  // } catch (error) {
  //   logger.debug(error);
  // }

  // return 404 when url is undefined or not match with any route
  function notFound(req, res) {
    return resLayer.sendError(res, 404, 'not_found', 404, 'Not found');
  }
  app.get('*', notFound);
  app.post('*', notFound);
  app.put('*', notFound);
  app.delete('*', notFound);
};
