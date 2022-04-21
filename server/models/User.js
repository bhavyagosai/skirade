const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  age: Number,
  city: String,
  country: String,
  education: String,
  institution: String,
  degree: String,
  passingYear: Number,
  createdAt: String,
  profileImage: String,
  starredPosts: Array,
  github: String,
  linkedin: String,
  twitter: String,
  instagram: String,
  title: String,
  about: String,
  skills: Array,
  languages: Array,
  // experience
});

module.exports = model("User", userSchema);
