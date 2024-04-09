const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static findByEmail(email) {
    const db = getDb();
    return db.collection("users").findOne({ email: email });
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return new User(user.email, user.password, user.name); // Construct User object
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static findOne(query) {
    const db = getDb();
    return db.collection("users").findOne(query);
  }

  // Method to save the user to the database
  save() {
    const db = getDb();
    return db.collection("users").insertOne({
      email: this.email,
      password: this.password,
      name: this.name,
    });
  }
}

module.exports = User;
