const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    school: {
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