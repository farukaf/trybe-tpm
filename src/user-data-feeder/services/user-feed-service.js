const githubApi = require("./github-api");
const influxContext = require("./influx-context");

const getContributions = async (userName) => { 
  let result = await githubApi.getContributions(userName);
  return result;
};

const getUsername = async (sub) => { 
  let result = await githubApi.getUserData(sub);
  return result;
};

getPoints = (contributions) => {


}

const process = async (user) => {
  let username = await getUsername(user.sub);
  let contributions = await getContributions(username);
  let points = getPoints(contributions);
  await influxContext.publish(points);
};


exports.process = process;