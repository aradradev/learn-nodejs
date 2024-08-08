const path = require('path')
const StatusCodes = require('http-status-codes')

const uploadProductImage = async (req, res) => {
  console.log(req.files)
  res.send('Upload Product Image')
}
module.exports = uploadProductImage
