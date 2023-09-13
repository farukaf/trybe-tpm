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
 

const process = async (user) => {
  let username = user.login || await getUsername(user.sub);
  if(!username) return;
  let contributions = await getContributions(username, user.access_token); 
  if(!contributions) return;
  await influxContext.publish(contributions,username);
};


exports.process = process;