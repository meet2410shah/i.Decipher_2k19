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
    phone: {type: Number, unique: true},
    answers: [{ answer: String, time: { type: Date, default: Date.now }}],
    current: {type: Number, default: 1},
    registeredDate: { type: Date, default: Date.now },
    isVerified: { type : Boolean, default: false }
});

const Teams = mongoose.model('Teams', teamSchema);
module.exports = Teams;
