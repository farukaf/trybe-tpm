require('dotenv').config({ path: `.env.local` })
const express = require("express");
const bodyParser = require('body-parser');
const eventService = require("./services/auth-event-service");
 
const app = express(); 
 
app.get("/:userlogin", (req, res) => { 
  res.send(req.params.userlogin);
});
 
app.listen(3005, () => console.log("Register Api is listening on port 3005."));
