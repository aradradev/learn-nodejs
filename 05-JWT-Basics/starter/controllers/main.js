const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError('Something went wrong. Please provide a username or password')
  }
  const id = new Date().getTime()
  // console.log(id)
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.status(StatusCodes.CREATED).json({ msg: 'User signed in', token })
}

const dashboard = async (req, res) => {
  console.log(req.user)
  const { username } = req.user
  const luckyNumber = Math.floor(Math.random() * 100)

  res
    .status(StatusCodes.OK)
    .json({ msg: `Hello ${username}`, secret: `Here is your authorized data. Your luck number is ${luckyNumber}` })
}

module.exports = { login, dashboard }
