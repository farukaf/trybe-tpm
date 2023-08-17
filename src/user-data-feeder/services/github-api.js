const fetch = require("node-fetch"); 
  
async function getUserData(sub){
   const response = await fetch("https://api.github.com/user/" + sub);
   const data = await response.json();
   return data;
}

async function getContributions(username) { 
  const url = "https://api.github.com/graphql";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
  };
  const body = {
    query: `query {
      user(login: "${username}") {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();
  return data;
}

exports.getUserData = getUserData;
exports.getContributions = getContributions; 
