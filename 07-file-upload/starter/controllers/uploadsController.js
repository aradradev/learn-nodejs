const path = require('path')
const StatusCodes = require('http-status-codes')

const uploadProductImage = async (req, res) => {
  console.log(req.files)
  let productImage = req.files.image
  res.send('Upload Product Image')
}
module.exports = uploadProductImage
