const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    roles: {
        type: Array,
        'default': ["Student"]
    },
    endorsements: {
        type: Array,
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;