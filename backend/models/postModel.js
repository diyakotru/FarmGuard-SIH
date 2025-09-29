const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['question', 'blog', 'discussion', 'announcement'],
    required: true,
  },
  tags: [{
    type: String,
    lowercase: true,
  }],
  images: [{
    type: String, // URLs to images
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [commentSchema],
  isResolved: {
    type: Boolean,
    default: false,
  },
  location: {
    state: String,
    district: String,
  },
}, {
  timestamps: true,
});

// Index for better search performance
postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ category: 1, createdAt: -1 });
postSchema.index({ 'location.state': 1, 'location.district': 1 });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;