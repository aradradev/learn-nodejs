const StatusCodes = require('http-status-codes')

const uploadProductImage = async (req, res) => {
  console.log(req)
  res.send('Upload Product Image')
}
module.exports = uploadProductImage
