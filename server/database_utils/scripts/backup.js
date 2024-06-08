const args = require('yargs').argv;
const {execSync} = require('child_process');
const dbConfig = require('../config/config');
const moment = require('moment-timezone');
const path = require('path');

const env = args.env || process.env.NODE_ENV;
const config = dbConfig[env];

console.log('Database:', config);

if (config) {
  const filepath = path.resolve('database', 'backup', `${moment().format('YYYY-MM-DD-hhmmss')}_${env}.sql`);
  const command = `PGPASSWORD=${config.password} pg_dump -h "${config.host}" -p ${config.port} -U ${config.username} -d ${config.database} -n ${config.schema} > ${filepath}`;
  console.log('Backing up database...');
  execSync(command, {stdio: 'inherit'});
  console.log('Done.', filepath);
} else {
  console.error('Database infomation not found!');
}
