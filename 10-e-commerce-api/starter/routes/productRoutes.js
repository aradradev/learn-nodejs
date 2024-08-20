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

// authorizedPermission middleware
const { authorizePermissions } = require('../middleware/authentication')

// get all product
router.route('/').get(getAllProducts).post(authorizePermissions('admin'), createProduct)

// upload image
router.route('/uploadImage').post(authorizePermissions('admin'), uploadImage)

// get single route with id params
router
  .route('/:id')
  .get(getSingleProduct)
  .patch(authorizePermissions('admin'), updateProduct)
  .delete(authorizePermissions('admin'), deleteProduct)

module.exports = router
