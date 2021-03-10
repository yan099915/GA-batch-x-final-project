const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const historySchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    content: {type: String, default: 0},
    video: {type: String},
    times: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('History', historySchema);


