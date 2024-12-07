// models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    scheduleTime: { type: String, required: true },
});

module.exports = mongoose.model('Medicine', medicineSchema);
