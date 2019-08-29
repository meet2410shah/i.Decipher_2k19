const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
const teamSchema = new Schema({
    name1: String,
    name2: String,
    teamName: String,
    password: String,
    email: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        unique: true
    },
    phone: Number,
<<<<<<< HEAD
    answers: [{ answer: String, time: { type: Date, default: Date.now } }],
=======
    answers: [{ answer: String, time: { type: Date, default: Date.now}}],
>>>>>>> bf4818aa6fd9c43cb23e29d25d59c2afa9446829
    current: {type: Number, default: 1},
    registeredDate: { type: Date, default: Date.now },
    isVerified: Boolean
});

const Teams = mongoose.model('Teams', teamSchema);
module.exports = Teams;
