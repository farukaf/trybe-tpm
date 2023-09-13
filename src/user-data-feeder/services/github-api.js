const fetch = require("node-fetch");

async function getUserData(sub) {
  //https://api.github.com/user/19143772
  const response = await fetch("https://api.github.com/user/" + sub);
  const data = await response.json();
  return data;
}

async function getContributions(username, usertoken) {
  const url = "https://api.github.com/graphql";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${usertoken || process.env.GITHUB_TOKEN}`,
  };
  const body = {
    query: `query {
      user(login: "${username}") { 
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
          totalIssueContributions
          totalPullRequestContributions
          totalCommitContributions
          totalRepositoryContributions
        }
      }
    }`,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json(); 
  return data.data.user.contributionsCollection || null;
}

exports.getUserData = getUserData;
exports.getContributions = getContributions;
