const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema and Model
const teamSchema = new Schema({
  name1: { type: String, maxlength: 50 },
  name2: { type: String, maxlength: 50 },
  teamName: { type: String, unique: true, maxlength: 50 },
  password: { type: String },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
    unique: true
  },
  phone: { type: Number, unique: true, maxlength: 50 },
  answers: [
    {
      answer: { type: String, maxlength: 20 },
      time: { type: Date, default: Date.now }
    }
  ],
  current: { type: Number, default: 1 },
  registeredDate: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false }
});

const Teams = mongoose.model("Teams", teamSchema);
module.exports = Teams;
