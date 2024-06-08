const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const Logger = require('../../utils/logger.utils');

const models = {};

const connection = {
  database: process.env.PG_DB_DATABASE,
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  host: process.env.PG_DB_HOST,
  schema: process.env.PG_DB_SCHEMA,
  port: process.env.PG_DB_PORT || 5432,
  dialect: process.env.PG_DB_DIALECT,
  connectionTimeoutMillis: 10000,
  logging: false, // disable logging the queries
};

const pool = {
  max: 10, 
  min: 0, 
  acquire: 30000, 
  idle: 10000
};

const database = new Sequelize(
    connection.database,
    connection.username,
    connection.password,
    {
      ...connection,
      pool
    }
);


database
    .authenticate()
    .then((res) => Logger.info('Connection to database successfully.'))
    .catch((error) =>
      Logger.error('Unable to connect to the database - ' + error),
    );

fs.readdirSync(__dirname)
    .filter((file) => {
      return file !== basename && file.endsWith('.model.js');
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
          database,
          Sequelize.DataTypes,
      );
      models[model.name] = model;
    });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.database = database;

module.exports = models;
