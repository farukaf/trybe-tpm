const fs = require("fs");
const faker = require("faker");

// User and measurement details
const githubUser = "farukaf";
const measurement = "github_activity";

// Generate data for the past 20 days
const currentDate = new Date(); // Current date and time
const data = [];

for (let i = 0; i < 20; i++) {
  const date = new Date(currentDate);
  date.setDate(date.getDate() - i); // Subtract days to go back in time
  const date2 = new Date(date);
  date2.setHours(date2.getHours() + 1);
  date2.setMinutes(0);
  const date3 = new Date(date2);
  date3.setMinutes(date3.getMinutes() + 1);

  // Generate random values
  const ttlcnt0 = faker.random.number({ min: 0, max: 50 });
  const ttlcnt1 = faker.random.number({ min: 0, max: 200 });
  const ttlcnt2 = faker.random.number({ min: 0, max: 10 });
  const ttlcnt3 = faker.random.number({ min: 0, max: 10 });
  const ttlcnt4 = faker.random.number({ min: 0, max: 5 });

  // Create a CSV rows
  const csvRow = [
    `,,${data.length+0},${date.toISOString()},${date2.toISOString()},${date3.toISOString()},${ttlcnt0},totalCommitContributions,${measurement},${githubUser}`,
    `,,${data.length+1},${date.toISOString()},${date2.toISOString()},${date3.toISOString()},${ttlcnt1},totalContributions,${measurement},${githubUser}`,
    `,,${data.length+2},${date.toISOString()},${date2.toISOString()},${date3.toISOString()},${ttlcnt2},totalIssueContributions,${measurement},${githubUser}`,
    `,,${data.length+3},${date.toISOString()},${date2.toISOString()},${date3.toISOString()},${ttlcnt3},totalPullRequestContributions,${measurement},${githubUser}`,
    `,,${data.length+4},${date.toISOString()},${date2.toISOString()},${date3.toISOString()},${ttlcnt4},totalRepositoryContributions,${measurement},${githubUser}`,
  ];

  // Add the rows to the data array
  data.push(...csvRow);
}

// Create the CSV content
const csvContent = `#group,false,false,true,true,false,false,true,true,true
#datatype,string,long,dateTime:RFC3339,dateTime:RFC3339,dateTime:RFC3339,double,string,string,string
#default,mean,,,,,,,,
,result,table,_start,_stop,_time,_value,_field,_measurement,github_user
${data.join("\n")}`;

// Write the CSV content to a file
fs.writeFileSync("generated_data.csv", csvContent, "utf8");

console.log("Data saved to generated_data.csv");
