const redisContex = require("./redis-context");

const rateLimit = process.env.RATE_LIMIT ? parseInt(process.env.RATE_LIMIT) : 5;

const getSecondsUntilMidnight = () => { 
    const now = new Date();
    let midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const result = Math.floor(diff/ 1000);
    return result;
}

exports.setRate = async (userLogin) => {
  const timeUntilExpSeconds = getSecondsUntilMidnight();

  let rate = await redisContex.get(userLogin);
  if (rate) {
    rate = parseInt(rate) + 1;
    await redisContex.set(userLogin, rate, timeUntilExpSeconds);
  } else {
    rate = 1;
    await redisContex.set(userLogin, rate, timeUntilExpSeconds);
  }

  return {
    rate: rate,
    limitReached: rate > rateLimit,
    timeUntilExpSeconds: timeUntilExpSeconds,
    rateLimit: rateLimit,
    rateRemaining: rateLimit - rate,
  };
};
