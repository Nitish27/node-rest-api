const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'must provide user'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'must provide title'],
    trim: true
  },
  body: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)