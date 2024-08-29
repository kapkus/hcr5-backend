const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    userType: { type: String, required: true },
    creator: { type: Boolean, required: true },
    step: { type: Number, required: true },
});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;