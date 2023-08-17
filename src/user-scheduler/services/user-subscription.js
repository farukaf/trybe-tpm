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

exports.readUsers = async function () {
  let collection = await GetCollection();
  let subscribedUsers = await collection.find({}).toArray(); 
  return subscribedUsers;
};
