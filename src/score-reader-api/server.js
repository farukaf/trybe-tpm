require("dotenv").config({ path: `.env.local` });
const express = require("express");
const influxContext = require("./services/influx-context");
const rateService = require("./services/rate-service");

const app = express();

app.get("/api/:userlogin", async (req, res) => {
  let rateResult = await rateService.setRate(req.params.userlogin);
  if (rateResult.limitReached) {
    res
      .status(429)
      .header("X-RateLimit-Limit", rateResult.rateLimit)
      .header("X-RateLimit-Remaining", rateResult.rateRemaining)
      .header("X-RateLimit-InSeconds", rateResult.timeUntilExpSeconds)
      .send("Too Many Requests");
    return;
  }
  let data = await influxContext.get(req.params.userlogin);
  res
    .status(200)
    .header("X-RateLimit-Limit", rateResult.rateLimit)
    .header("X-RateLimit-Remaining", rateResult.rateRemaining)
    .header("X-RateLimit-InSeconds", rateResult.timeUntilExpSeconds)
    .send(data);
});

app.listen(3005, () =>
  console.log("Score Reader API is listening on port 3005.")
);
