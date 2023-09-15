const { InfluxDB } = require("@influxdata/influxdb-client");

const token = process.env.INFLUXDB_TOKEN;
const url = `http://${process.env.INFLUX_HOST}:${process.env.INFLUX_PORT}`;

const generateClient = () => {
  return new InfluxDB({
    url: url,
    token: token,
  });
};

const generateQuery = (userlogin) => {
  return `
    from(bucket: "${process.env.INFLUX_BUCKETNAME}")
        |> range(start: -30d)
        |> filter(fn: (r) => r._measurement == "github_activity" and r.github_user == "${userlogin}")
        |> aggregateWindow(every: 1d, fn: sum, createEmpty: false)
        |> yield(name: "sum")
    `;
};

const getDataFromUserLogin = async (userlogin) => {
  const client = generateClient();
  const queryApi = client.getQueryApi(process.env.INFLUX_ORG);
  const query = generateQuery(userlogin);
  let data = [];
  for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
    const _values = tableMeta.toObject(values); 
    data.push(_values);
  }

  const contributionsByDate = {
    userlogin: userlogin,
    contributions: [],
  };

  // Process the query result
  data.forEach((row, tableMeta) => {
    const timestamp = row["_time"];
    const fieldName = row["_field"];
    const value = row["_value"];

    // Find the entry for the current date or create a new one
    const dateEntry = contributionsByDate.contributions.find(
      (entry) => entry.date === timestamp
    );

    if (dateEntry) {
      // Update the existing entry
      dateEntry[fieldName] = value;
    } else {
      // Create a new entry for the current date
      const newEntry = {
        date: timestamp,
        [fieldName]: value,
      };
      contributionsByDate.contributions.push(newEntry);
    }
  });

  return contributionsByDate;
};

exports.get = async (userlogin) => {
  return await getDataFromUserLogin(userlogin);
};
