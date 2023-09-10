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
  let existingUsers = await collection
    .find({ email: event.user.email })
    .toArray();
  if (existingUsers.length) {
    let existingUser = existingUsers[0];
    existingUser.login = event.user.login || existingUser.login;
    existingUser.access_token = event.user.access_token || existingUser.access_token;
    existingUser.updateDate = new Date().toJSON();
    await collection.replaceOne({_id: existingUser._id}, existingUser);
    console.log(["Updated user", event.user]);
    return existingUsers;
  }

  event.user.timestamp = event.timestamp ?? new Date().getTime();
  let insertResult = await collection.insertOne(event.user);
  console.log(["Inserted user", event.user]);
  return insertResult;
};
