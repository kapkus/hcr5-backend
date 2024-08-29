const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    superUser: { type: Boolean, required: true },
    userType: { type: String, required: true },
    settings: {
        step: { type: Number, required: true },
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;