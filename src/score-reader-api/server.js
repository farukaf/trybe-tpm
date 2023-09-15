require('dotenv').config({ path: `.env.local` })
const express = require("express"); 
const influxContext = require("./services/influx-context");
 
const app = express(); 
 
app.get("/:userlogin", async (req, res) => { 
  let data = await influxContext.get(req.params.userlogin);
  res.send(data);
});
 
app.listen(3005, () => console.log("Score Reader API is listening on port 3005."));
