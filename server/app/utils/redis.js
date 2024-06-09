const redis = require("redis");
const Logger = require("./logger.utils");

const redisClient = redis.createClient({
  socket: { host: `${process.env.REDIS_HOST}`, port: `${process.env.REDIS_PORT}` },
});

redisClient.on("error", (err) => Logger.error("Redis Client Error", err));
redisClient.connect();
redisClient.on("connect", () => Logger.info("Connected to Redis successfully."));

function parseRedisResult(result) {
  const data = [];
  for (let i = 0; i < result.length; i += 1) {
    data.push(JSON.parse(result[i]));
  }
  return { rows: data, count: data.length };
}

// Function to prepare data for storing in Redis
function prepareRedisData(rows) {
  const redisData = [];
  rows.forEach((row, index) => {
    redisData.push({
      score: index + 1, 
      value: JSON.stringify(row),
    });
  });
  return redisData;
}

module.exports = {
  redisClient,
  parseRedisResult,
  prepareRedisData,
};
