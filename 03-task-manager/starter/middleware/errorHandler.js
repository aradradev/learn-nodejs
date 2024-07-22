const errorHandlerMiddleware = (err, _req, res, _next) => {
  return res.status(500).json({ msg: err })
}

module.exports = errorHandlerMiddleware
