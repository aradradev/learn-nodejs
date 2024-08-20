const express = require('express')
const router = express.Router()

// import all review controllers
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')

// import authenticate middleware
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin', 'user')], createReview)
  .get(getAllReviews)

router
  .route('/:id')
  .get(getSingleReview)
  .patch([authenticateUser, authorizePermissions('admin')], updateReview)
  .delete([authenticateUser, authorizePermissions('admin')], deleteReview)

module.exports = router
