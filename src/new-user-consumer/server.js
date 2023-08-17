require('dotenv').config({ path: `.env.local` })
const express = require("express");
const bodyParser = require('body-parser');
const eventService = require("./services/auth-event-service");
const userSubscription = require("./services/user-subscription")

eventService.start();
userSubscription.start();

const app = express();
var jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  res.send("Server is up.");
});
 
app.listen(3002, () => console.log("New User Consumer is listening on port 3002."));
