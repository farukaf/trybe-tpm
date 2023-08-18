require('dotenv').config({ path: `.env.local` })
const express = require("express");
const bodyParser = require('body-parser');
const eventService = require("./services/auth-event-service");



const app = express();
var jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  res.send("Server is up.");
});

app.post("/event", jsonParser, (req, res) => {
  console.log(req.body);
  if(!(req.body?.eventName)){ 
    res.status(400).send("BAD");
    return;
  }
  eventService.register(req.body);
  res.send("OK");
});

app.listen(3001, () => console.log("User Register Api is listening on port 3001."));
