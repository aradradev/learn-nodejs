// import model
const Review = require('../models/Review')
const Product = require('../models/Product')

// import custom error
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { checkPermissions } = require('../utils')

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
  const reviews = await Review.find({})
    .populate({ path: 'product', select: 'name company price' })
    .populate({ path: 'user', select: 'name' })
  if (!reviews) {
    throw new CustomError.NotFoundError('No reviews added yet.')
  }
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params
  console.log(reviewId)
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
  }
  res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params
  const { rating, title, comment } = req.body
  const review = await Review.findOne({ _id: reviewId })
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
  }
  checkPermissions(req.user, review.user)
  review.rating = rating
  review.title = title
  review.comment = comment
  await review.save()
  res.status(StatusCodes.OK).json({ review })
}

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params
  const review = await Review.findOne({ _id: reviewId })

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`)
  }

  checkPermissions(req.user, review.user)

  // Use deleteOne instead of remove
  await review.deleteOne()

  res.status(StatusCodes.OK).json({ msg: `Review with id:${reviewId} deleted successfully` })
}

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params
  const reviews = Review.findOne({ product: productId })
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
