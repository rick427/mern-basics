const mongoose = require('mongoose');

const ExceriseSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true});

module.exports = mongoose.model('Exercise', ExceriseSchema);


