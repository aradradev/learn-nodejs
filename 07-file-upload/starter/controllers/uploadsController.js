const path = require('path')
const StatusCodes = require('http-status-codes')
const CustomError = require('../errors')
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded')
  }

  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image')
  }
  if (productImage.size > process.env.MAX_SIZE) {
    throw new CustomError.BadRequestError('Please Upload Image Smaller 1KB')
  }
  const imagePath = path.join(__dirname, `../public/uploads/${productImage.name}`)
  await productImage.mv(imagePath)
  return res.status(StatusCodes.OK).json({ image: { src: `uploads/${productImage.name}` } })
}

const uploadProductImage = async (req, res) => {
  const imagePath = req.files.image.tempFilePath
  const result = await cloudinary.uploader.upload(imagePath, {
    use_filename: true,
    folder: 'file-upload',
  })
  fs.unlinkSync(imagePath)
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}
module.exports = uploadProductImage
