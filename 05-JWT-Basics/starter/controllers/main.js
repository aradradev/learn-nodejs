const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('Something went wrong. Please provide a username or password', 400)
  }
  const id = new Date().getTime()
  // console.log(id)
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
  res.status(201).json({ msg: 'User signed in', token })
}

const dashboard = async (req, res) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401)
  }
  const token = authHeaders.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    const { username } = decoded
    // console.log(username)
    const luckyNumber = Math.floor(Math.random() * 100)
    console.log(luckyNumber)
    res
      .status(200)
      .json({ msg: `Hello ${username}`, secret: `Here is your authorized data, Your lucky number is ${luckyNumber}` })
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }

  // const luckyNumber = Math.floor(Math.random() * 100)
  // res.json({ msg: `Hello, John Doe`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = { login, dashboard }
