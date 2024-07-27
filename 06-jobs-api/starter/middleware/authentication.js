const User = require('../models/User')
const UnauthenticatedError = require('../errors')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid invalid')
  }
  const token = authHeaders.split(' ')[1]
  if (!token) {
    throw new UnauthenticatedError('Invalid invalid')
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
