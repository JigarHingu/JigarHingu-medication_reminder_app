// models/Acknowledgment.js
const mongoose = require('mongoose');

const acknowledgmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    status: { type: String, enum: ['Taken', 'Missed'], required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Acknowledgment', acknowledgmentSchema);
