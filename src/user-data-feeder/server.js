require("dotenv").config({ path: `.env.local` });
const express = require("express");
const bodyParser = require("body-parser");
const eventService = require("./services/user-feed-event-service");

const app = express(); 
eventService.start();

app.get("/", async (req, res) => { 
  res.send("Ok");
});

app.listen(3004, () =>
  console.log("User Data Feeder is listening on port 3004.")
);
