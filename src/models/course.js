const mongoose = require("mongoose");

const course = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true},
    role: { type: String, required: true }
  },
  { versionKey: false }
);

const courses = mongoose.model("course", course, "courses");

module.exports = courses;
