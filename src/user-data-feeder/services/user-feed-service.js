const githubApi = require("./github-api");

const getUser = async () => {
  let user = await githubApi.getUserData("19143772");
  let result = await githubApi.getContributions(user.login);
};
