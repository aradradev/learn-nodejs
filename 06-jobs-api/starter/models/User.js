const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 32,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    minlength: 6,
  },
})

module.exports = mongoose.model('User', UserSchema)
