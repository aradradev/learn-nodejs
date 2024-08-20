// import models
const Product = require('../models/Product')

// http status codes
const { StatusCodes } = require('http-status-codes')

// import custom error
const CustomError = require('../errors')

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
  const product = await Product.findOne({ _id: req.params.id })
  if (!product) {
    throw new CustomError.NotFoundError(`Product not found with id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
  if (!product) {
    throw new CustomError.NotFoundError(`Product not found with id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  res.send('delete product')
}

const uploadImage = async (req, res) => {
  res.send('upload image')
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
