const mongoose = require('mongoose');
const { type } = require('os');

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    blocks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Block',
    }
    ],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        res:'Project',
    }]

})

const User = mongoose.model("users", registerSchema);
module.exports = User