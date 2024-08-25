const CustomError = require('../errors')
const Order = require('../models/Order')
const Product = require('../models/Product')

const createOrder = async (req, res) => {
  const { tax, shippingFee, items: cartItems } = req.body
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided')
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shippingFee')
  }
  let orderItems = []
  let subtotal = 0
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id: ${item.product}`)
    }
    const { name, price, image, _id } = dbProduct
    const singleCartItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    }
    orderItems = [...orderItems, singleCartItem]
    subtotal += item.amount * price
  }
  res.send('create order')
}

const getAllOrders = async (req, res) => {
  res.send('get all orders')
}

const getSingleOrder = async (req, res) => {
  res.send('get single order')
}

const getCurrentUserOrders = async (req, res) => {
  res.send('get current user orders')
}

const updateOrder = async (req, res) => {
  res.send('update order')
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
}
