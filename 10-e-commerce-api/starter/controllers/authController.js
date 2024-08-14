// Import user model
const User = require('../models/User')

// Import dependencies
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse } = require('../utils')

const register = async (req, res) => {
  // Check if email exists
  const { email, name, password } = req.body
  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    throw new CustomError.BadRequestError('Email already exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const user = await User.create({ email, name, password, role })
  const tokenUser = { name: user.name, userId: user._id, role: user.role }
  attachCookiesToResponse({ res, user: tokenUser })
}

const login = async (req, res) => {
  res.send('login page')
}

const logout = async (req, res) => {
  res.send('logout page')
}

module.exports = {
  register,
  login,
  logout,
}
