const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  author: String,
  title: String,
  description: String,
  role: String,
  skills: Array,
  experience: String,
  duration: String,
  university: String,
  createdAt: String,
});

module.exports = model("Post", postSchema);
