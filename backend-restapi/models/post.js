// models/post.js

const { ObjectID } = require("mongodb");
const { getDb } = require("../util/database");

class Post {
  constructor(title, imageUrl, content, creator) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.content = content;
    this.creator = creator;
  }

  save() {
    const db = getDb();
    return db.collection("posts").insertOne({
      title: this.title,
      imageUrl: this.imageUrl,
      content: this.content,
      creator: this.creator,
    });
  }

  static findById(postId) {
    const db = getDb();
    return db.collection("posts").findOne({ _id: new ObjectID(postId) });
  }
}

module.exports = Post;
