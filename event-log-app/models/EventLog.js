const mongoose = require('mongoose');


const EventLogSchema = new mongoose.Schema({
    description:{type: String, required: true},
    eventType:{type: String, required: true},
    date:{type: Date, default: Date.now}
});


module.exports = mongoose.model('EventLog', EventLogSchema);