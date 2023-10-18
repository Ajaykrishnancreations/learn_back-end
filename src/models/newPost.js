const mongoose = require("mongoose");

const course = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    description: { type: String, required: true}
  },
  { versionKey: false }
);

const addNewPost = mongoose.model("posts", course, "posts");

module.exports = addNewPost;
