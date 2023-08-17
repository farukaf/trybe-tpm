require('dotenv').config({ path: `.env.local` })
const express = require("express");
const bodyParser = require('body-parser');
const eventService = require("./services/user-feed-event-service");
const githubApi = require("./services/github-api");

const app = express();
var jsonParser = bodyParser.json();

app.get("/", async (req, res) => { 
  let user = await githubApi.getUserData('19143772');
  let result = await githubApi.getContributions(user.login);
  res.send(result);
});

app.post("/event", jsonParser, (req, res) => { 
});

app.listen(3004, () => console.log("Register Api is listening on port 3004."));
