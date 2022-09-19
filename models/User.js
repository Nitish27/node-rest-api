const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    // maxlength: [20, 'name can not be more than 20 characters']
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  city: {
    type: String
  },
  zipcode: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  company: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)