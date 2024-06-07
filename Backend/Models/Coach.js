// Model: Coach.js
const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  expertise: [{
    type: String,
    required: true
  }],
  experience: {
    type: Number, 
    required: true
  }
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach