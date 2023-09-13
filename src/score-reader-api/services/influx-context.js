const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token = process.env.INFLUXDB_TOKEN;
const url = `http://${process.env.INFLUX_HOST}:${process.env.INFLUX_PORT}`; 
const precision = "ns";

const client = new InfluxDB({ url, token });

exports.measurements = { commits: "commits", pullrequests: "pullrequests", test: "test" };

exports.get = async (userlogin) => {

}