const express = require('express')
const router = express.Router()

// import controllers
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
} = require('../controllers/orderController')

// authentication middleware
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authorizePermissions('admin')], getAllOrders)

router.route('/showAllMyOrders').get(authenticateUser, getCurrentUserOrders)

router.route('/:id').get([authenticateUser, getSingleOrder], getSingleOrder).patch(authenticateUser, updateOrder)

module.exports = router
