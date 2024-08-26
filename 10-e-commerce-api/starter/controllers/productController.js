// import models
const Product = require('../models/Product')

// http status codes
const { StatusCodes } = require('http-status-codes')

// import custom error
const CustomError = require('../errors')

// import path
const path = require('path')
const Review = require('../models/Review')

const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId }).populate('reviews')
  if (!product) {
    throw new CustomError.NotFoundError(`Product not found with id: ${productId}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true, runValidators: true })
  if (!product) {
    throw new CustomError.NotFoundError(`Product not found with id: ${productId}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomError.NotFoundError(`Product not found with id: ${productId}`)
  }
  // manually delete all associated reviews
  await Review.deleteMany({ product: productId })
  await product.deleteOne()
  res.status(StatusCodes.OK).json({ msg: `Product with id:"${productId}" deleted successfully` })
}

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No file upload')
  }
  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image')
  }
  const maxSize = 1024 * 1024
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Upload image smaller than 1MB')
  }
  const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)

  // move the productImage to the right path
  await productImage.mv(imagePath)

  // send back the response
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
