const express = require("express");
const app = express();
var redis = require("redis");
client = redis.createClient();
let PORT = 5000;

app.get("/jobs", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  client.get("github", function(err, jobs) {
    // reply is null when the key is missing
    // console.log(JSON.parse(jobs).length);
    res.send(jobs);
  });
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
