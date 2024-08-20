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

// authenticated middleware
const authenticateUser = require('../middleware/authentication')

// get all product
router.route('/').get(authenticateUser, getAllProducts).post(authenticateUser, createProduct)

// upload image
router.route('/uploadImage').post(uploadImage)

// get single route with id params
router.route('/:id').get(getSingleProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router
