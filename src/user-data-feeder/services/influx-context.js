const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token = process.env.INFLUXDB_TOKEN;
const url = `http://${process.env.INFLUX_HOST}:${process.env.INFLUX_PORT}`;

const client = new InfluxDB({
  url: url,
  token: token,
});

exports.publish = async (data, username) => {
  const writeAPi = client.getWriteApi(
    process.env.INFLUX_ORG,
    process.env.INFLUX_BUCKETNAME
  );
  // Create a new Point and add GitHub activity data
  const point = new Point("github_activity")
    .tag("github_user", username)
    .floatField(
      "totalContributions",
      data.contributionCalendar.totalContributions || 0
    )
    .floatField("totalIssueContributions", data.totalIssueContributions)
    .floatField(
      "totalPullRequestContributions",
      data.totalPullRequestContributions
    )
    .floatField("totalCommitContributions", data.totalCommitContributions)
    .floatField(
      "totalRepositoryContributions",
      data.totalRepositoryContributions
    );

  console.log(point);

  writeAPi.writePoint(point);

  writeAPi.close().then(() => {
    console.log(`Finished writing point to InfluxDB to user ${username}`);
  });
};
