require('dotenv').config({ path: `.env.local` })
const express = require("express");
const bodyParser = require('body-parser');
const eventService = require("./services/user-feed-event-service");
const userSubscription = require("./services/user-subscription");
 
const app = express();
var jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  res.send("Server is up.");
});

app.post("/feed-users", jsonParser, async (req, res) => {
  var users = await userSubscription.readUsers();
  console.log(`found ${users.length} users.`)
  users.forEach(user => {
    eventService.register(user);
  });
  res.send("OK");
});

app.listen(3003, () => console.log("Register Api is listening on port 3003."));
