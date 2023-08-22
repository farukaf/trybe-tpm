const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token = process.env.INFLUXDB_TOKEN;
const url = `http://${process.env.INFLUX_HOST}:${process.env.INFLUX_PORT}`; 
const precision = "ns";

const client = new InfluxDB({ url, token });

exports.measurements = { commits: "commits", pullrequests: "pullrequests", test: "test" };

exports.publish = async function (measurement, points) {
  let writeClient = client.getWriteApi(
    process.env.INFLUX_ORG,
    process.env.INFLUX_BUCKETNAME,
    precision
  );
  points.forEach((p) => { 
    let point = new Point(measurement)
      .tag("username", p.username);

    writeClient.writePoint(point);
  });

  writeClient.flush();
};


exports.publishTest = async function (measurement, user) {
  let writeClient = client.getWriteApi(
    process.env.INFLUX_ORG,
    process.env.INFLUX_BUCKETNAME,
    precision
  );

  let point = new Point(measurement)
    .tag("user", user)
    .stringField("user", user);
  
  writeClient.writePoint(point);
  writeClient.flush()
 
};