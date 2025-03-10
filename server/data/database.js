const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database; 


async function connect() {
  const client = await MongoClient.connect("mongodb://localhost/");
  database = client.db("gamezone");  
  console.log("Database connected");
}


function getDb() {
  if (!database) {
    throw new Error("Database connection not established!");  
  }
  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
