require("dotenv").config({ path: `.env.local` });
const express = require("express");
const bodyParser = require("body-parser");
const eventService = require("./services/user-feed-event-service");
const influxContext = require("./services/influx-context");

const app = express();
var jsonParser = bodyParser.json();
//eventService.start();

app.get("/", async (req, res) => {
  await influxContext.publishTest(
    influxContext.measurements.test,
    "farukaf"
  );
  res.send("Ok");
});

app.listen(3004, () =>
  console.log("User Data Feeder is listening on port 3004.")
);
