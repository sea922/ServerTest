const redis = require("redis");
const Logger = require("./logger.utils");

const redisClient = redis.createClient({
  socket: { host: `${process.env.REDIS_HOST}`, port: `${process.env.REDIS_PORT}` },
});

redisClient.on("error", (err) =>  Logger.error("Redis Client Error", err));
redisClient.connect();
redisClient.on("connect", () =>  Logger.info("Connected to Redis successfully."));


module.exports = {
  redisClient
};