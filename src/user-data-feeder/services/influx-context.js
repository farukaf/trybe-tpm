const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const measurements = { commits: "commits", pullrequests: "pullrequests" };

const token = process.env.INFLUXDB_TOKEN;
const url = `http://${process.env.INFLUX_HOST}:${process.env.INFLUX_PORT}`; 
const precision = "ns";

const client = new InfluxDB({ url, token });

exports.measurements = measurements;
exports.publish = async function (measurement, user, repo) {
  let writeClient = client.getWriteApi(
    process.env.INFLUX_ORG,
    process.env.INFLUX_BUCKETNAME,
    precision
  );

  let point = new Point(measurement)
    .tag("repo", repo)
    .stringField("user", user);
  
  writeClient.writePoint(point);
  writeClient.flush()
 
};
