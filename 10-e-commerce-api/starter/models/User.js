const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
})

UserSchema.pre('save', function next() {
  if (!this.isModified('password')) return
  const salt = bcrypt.genSalt()
})

module.exports = mongoose.model('User', UserSchema)
