const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  video: String,
});

const videoCollection = mongoose.model('Video', videoSchema,"Video");

module.exports = videoCollection