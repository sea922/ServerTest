const args = require('yargs').argv;
const {execSync} = require('child_process');
const dbConfig = require('../config/config');
const path = require('path');
const fs = require('fs');

const env = args.env || process.env.NODE_ENV;
const config = dbConfig[env];
const name = args.name;
const force = args.force;

console.log('Database:', config);

if (config) {
  let fileNames = fs
      .readdirSync(path.resolve('database', 'backup'))
      .filter((fileName) => {
        return (fileName.endsWith('.sql'));
      })
      .filter((fileName) => {
        return name == null || name == '' || name == true || (fileName.startsWith(name));
      });

  fileNames = fileNames.sort((f1, f2) => {
    if (f1 < f2) return -1;
    if (f1 > f2) return 1;
    return 0;
  });

  const fileName = fileNames.at(0);

  if (fileName) {
    if (force) {
      console.log(`Deleting database "${config.database}" ...`);
      const deleteCMD = `PGPASSWORD="${config.password}" dropdb -h "${config.host}" -p ${config.port} -U ${config.username} ${config.database}`;
      execSync(deleteCMD, {stdio: 'inherit'});
      console.log(`Re-creating database "${config.database}" ...`);
      const createCMD = `PGPASSWORD="${config.password}" createdb -h "${config.host}" -p ${config.port} -U ${config.username} ${config.database}`;
      execSync(createCMD, {stdio: 'inherit'});
    }
    const filePath = path.resolve('database', 'backup', fileName);
    const command = `PGPASSWORD="${config.password}" psql -h "${config.host}" -p ${config.port} -U ${config.username} -d ${config.database} < ${filePath}`;
    console.log('Recovering database ...');
    execSync(command);
    console.log('Done.', filePath);
  } else {
    console.error('Backup file not found!');
  }
} else {
  console.error('Database infomation not found!');
}
