// Import User model
const User = require('../models/User')

// Status
const { StatusCodes } = require('http-status-codes')

// Custom error
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils')

const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user found with id: ${req.params.id}`)
  }
  checkPermissions(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    throw new CustomError.BadRequestError('Invalid Credentials')
  }
  const user = await User.findOne({ _id: req.user.userId })
  user.name = name
  user.email = email
  await user.save()
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  console.log(oldPassword, newPassword)
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Invalid Credentials. Please provide both values')
  }
  const user = await User.findOne({ _id: req.user.userId })
  const isPasswordCorrect = user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthorizedError('Invalid old password')
  }
  user.password = newPassword
  await user.save()
  res.status(StatusCodes.OK).json({ msg: 'Password updated successfully!' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
