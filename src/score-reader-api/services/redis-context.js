const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_CONNECTIONSTRING,
});
redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

exports.set = async (key, value, timeUntilExpSeconds) => {
  await redisClient.set(key, value);
  await redisClient.expire(key, timeUntilExpSeconds);
};

exports.get = async (key) => {
  return await redisClient.get(key);
};
