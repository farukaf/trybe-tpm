const { MongoClient } = require("mongodb");
const dbName = "userSubscription";
const collectionName = "userSubscription";
const client = new MongoClient(process.env.MONGO_CONNSTR);

async function GetCollection() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection;
}
async function main() {
  await GetCollection();
  return "done";
}

exports.start = function () {
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
};

exports.subscribe = async function (event) {
  let collection = await GetCollection();
  let existingUser = await collection.find({ email: event.user.email }).toArray();
  if (existingUser.length) return;

  event.user.timestamp = event.timestamp ?? new Date().getTime();
  let insertResult = await collection.insertOne(event.user);
  return insertResult;
};
