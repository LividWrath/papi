const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String
    },
    imageUrl: {
      type: String
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
