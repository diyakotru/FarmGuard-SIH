const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  farmName: {
    type: String,
    required: true,
  },
  farmType: {
    type: String,
    required: true,
    enum: ["Poultry Farm", "Pig Farm", "Both Pig and Poultry"], // Only allows these values
  },
  location: {
    type: String,
    required: true,
  },
  // This is the crucial link back to the user
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // This tells Mongoose it refers to a User document
  }
}, {
  timestamps: true
});

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;