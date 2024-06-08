const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const basename = path.basename(__filename);

const Logger = require("../../utils/logger.utils");

const models = {};

const connectionOptions = {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
};

// const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

mongoose
  .connect(process.env.MONGO_URI, connectionOptions)
  .then(() => Logger.info("Connected to MongoDB"))
  .catch((error) => Logger.error("Error connecting to MongoDB:", error));

fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".model.js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    models[model.modelName] = model;
  });

module.exports = models;
