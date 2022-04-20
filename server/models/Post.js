const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  author: String,
  authorName: String,
  authorImg: String,
  title: String,
  description: String,
  role: String,
  skills: Array,
  experience: String,
  duration: String,
  university: String,
  tags: Array,
  createdAt: String,
});

module.exports = model("Post", postSchema);
