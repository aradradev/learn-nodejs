// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Please try again later',
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.code && err.code === 11000) {
    customError.statusCode = 400
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
  }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(' | ')
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.statusCode = 404
    customError.msg = `Job not found with id ${Object.values(err.value).join('')}. Please try again later`
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
