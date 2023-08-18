const Influx = require("influx");

const measurements = { commits: "commits", pullrequests: "pullrequests" };
//NKpS_TZAXR_L0NwGo-zHyJIWnzN49wuVI1CdBnCJEtO7IhMTNa4uIEec251G6DMjA9Tjyk6YpKYZEN6lK1OfiQ==
const influx = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  port: process.env.INFLUX_PORT,
  password: process.env.INFLUX_PASSWORD,
  database: process.env.INFLUX_DATABASE,
  schema: [
    {
      measurement: measurements.commits,
      fields: {
        day: Influx.FieldType.STRING,
        user: Influx.FieldType.STRING,
      },
      tags: ["repo"],
    },
    {
      measurement: measurements.pullrequests,
      fields: {
        day: Influx.FieldType.STRING,
        user: Influx.FieldType.STRING,
      },
      tags: ["repo"],
    },
  ],
});

exports.measurements = measurements;
exports.publish = async function (measurement, day, user, repo) {
  await influx.writePoints([
    {
      measurement: measurement,
      tags: { repo: repo },
      fields: { day: day, user: user },
    },
  ]);
};
