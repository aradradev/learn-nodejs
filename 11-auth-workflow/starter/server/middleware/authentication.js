const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  const { accessTokenJWT, refreshTokenJWT } = req.signedCookies

  try {
    if (accessTokenJWT) {
      const payload = isTokenValid(accessTokenJWT)
      req.user = payload.user
      return next()
    }
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
}
