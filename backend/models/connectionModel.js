const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  message: {
    type: String,
    maxlength: 500,
  },
}, {
  timestamps: true,
});

// Ensure unique connections
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });

const Connection = mongoose.model('Connection', connectionSchema);
module.exports = Connection;