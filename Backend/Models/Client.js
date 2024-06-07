// Model - Client.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
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
  typeOfUser: {
    type: String,
    required: true
  },
  industry: {
    type: [String], 
    required: true
  },
  challengeTheme: {
    type: [String], 
    required: true
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
