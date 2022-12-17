const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Authtoken:{
        type: Array
    },
    emailVerified: {
        type: Boolean,
        required: false,
    },
})

const personModel = mongoose.model('personModel', personSchema);

module.exports = personModel

