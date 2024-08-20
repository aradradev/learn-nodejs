// import model
const Review = require('../models/Review')

// import custom error
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const createReview = async (req, res) => {
  req.body.user = req.user.userId
  req.body.product = req.user.productId
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
