const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Every email must be unique
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['farmer', 'veterinarian', 'authority', 'expert'],
    default: 'farmer',
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  location: {
    state: String,
    district: String,
    city: String,
  },
  specialization: {
    type: String, // For vets and experts
  },
  experience: {
    type: Number, // Years of experience
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String, // URL to profile picture
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;