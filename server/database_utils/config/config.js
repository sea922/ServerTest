const app = require('../../process.json').apps[0];

const config = {
  development: {
    username: app.env_development.PG_DB_USERNAME,
    password: app.env_development.PG_DB_PASSWORD,
    database: app.env_development.PG_DB_DATABASE,
    schema: app.env_development.PG_DB_SCHEMA || 'game_server',
    port: app.env_development.PG_DB_PORT,
    host: app.env_development.PG_DB_HOST,
    dialect: app.env_development.PG_DB_DIALECT || 'postgres',
  },
  production: {
    username: app.env_production.DB_USERNAME,
    password: app.env_production.DB_PASSWORD,
    database: app.env_production.DB_DATABASE,
    schema: app.env_production.DB_SCHEMA,
    port: app.env_production.DB_PORT,
    host: app.env_production.DB_HOST,
    dialect: app.env_production.DB_DIALECT,
  },
  localhost: {
    username: app.env_localhost.DB_USERNAME,
    password: app.env_localhost.DB_PASSWORD,
    database: app.env_localhost.DB_DATABASE,
    schema: app.env_localhost.DB_SCHEMA,
    port: app.env_localhost.DB_PORT,
    host: app.env_localhost.DB_HOST,
    dialect: app.env_localhost.DB_DIALECT,
  },
};


module.exports = config;
