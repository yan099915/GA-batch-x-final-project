const mongoose = require('mongoose');
const Schema = mongoose.Schema

const videoSchema = new Schema ({
  time: {type: String},
  videoUrl: {type: String},
  moves: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Video', videoSchema);


