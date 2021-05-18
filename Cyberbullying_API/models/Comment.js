const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: [1, 'Comment\'s max length is 1 char'],
    maxlength: [750, 'Comment\'s max length is 750 chars'],
    required: [true, 'Please add a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: Object,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
