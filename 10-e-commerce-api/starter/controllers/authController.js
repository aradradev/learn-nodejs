// Import user model
const User = require('../models/User')

// Import dependencies
const CustomError = require('../errors')
const { attachCookiesToResponse } = require('../utils')

// StatusCodes import
const { StatusCodes } = require('http-status-codes')

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
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email or password')
  }
  const user = await User.findOne({})
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
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
