const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
  try {
    const payload = isTokenValid({ token })
    req.user = { name: user.name, userId: user._id, role: user.role }
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

module.exports = authenticateUser
