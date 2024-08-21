// import model
const Review = require('../models/Review')
const Product = require('../models/Product')

// import custom error
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const createReview = async (req, res) => {
  const { product: productId } = req.body
  const isValidProduct = await Product.findOne({ _id: productId })

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`)
  }

  req.body.user = req.user.userId
  const alreadyReviewed = await Review.findOne({ user: req.user.userId, product: productId })

  if (alreadyReviewed) {
    throw new CustomError.BadRequestError('already submitted review for this product')
  }

  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
}

const getAllReviews = async (req, res) => {
  res.send('get all reviews')
}

const getSingleReview = async (req, res) => {
  res.send('get a single review')
}

const updateReview = async (req, res) => {
  res.send('update review')
}

const deleteReview = async (req, res) => {
  res.send('delete review')
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
