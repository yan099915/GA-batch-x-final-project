const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const Video = require('./video')

const contentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, default: 0},
    video: [{
        type: ObjectId,
        ref: Video
    }],
    description: {type: String},
    time: {type: String},
    gender: {type: String},
    equipment: {type: String},
    intensity: {type: String},
    level: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Content', contentSchema);


