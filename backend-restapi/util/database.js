const { MongoClient } = require("mongodb");

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Sidconnect:Sidleomessi^2@cluster0.rvoeszz.mongodb.net/messages?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("Connected to MongoDB");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};

module.exports = {
  mongoConnect,
  getDb,
};
