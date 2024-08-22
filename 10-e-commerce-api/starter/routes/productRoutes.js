const express = require('express')
const router = express.Router()

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController')
const { getSingleProductReviews } = require('../controllers/reviewController')

// authorizedPermission middleware
const { authorizePermissions, authenticateUser } = require('../middleware/authentication')

// get all product
router
  .route('/')
  .get(getAllProducts)
  .post([authenticateUser, authorizePermissions('admin')], createProduct)

// upload image
router.route('/uploadImage').post([authenticateUser, authorizePermissions('admin')], uploadImage)

// get single route with id params
router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)

router.route('/:id/reviews').get(getSingleProductReviews)

module.exports = router
