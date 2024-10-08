// Import user model
const User = require('../models/User')

// Import dependencies
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

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
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email or password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out' })
}

module.exports = {
  register,
  login,
  logout,
}
