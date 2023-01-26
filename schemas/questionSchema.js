const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    options: [
        {
            text: {
                type: String,
                required: true
            },
            correct: {
                type: Boolean,
                required: true
            }
        }
    ],
    correctOption: {
        type: Number,
        required: true
    }
});

module.exports = questionSchema;
