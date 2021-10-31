const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    question: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    answered: {
        type: Boolean
    },
    tags: {
        type: [String] 
    }
});

const Questions = mongoose.model('questions', QuestionSchema);
module.exports=Questions;