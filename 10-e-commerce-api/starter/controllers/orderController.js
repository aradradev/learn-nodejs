const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const Order = require('../models/Order')
const Product = require('../models/Product')

const fakeStripeApi = async ({ amount, currency }) => {
  const client_secret = 'fakeClientSecret'
  return { client_secret, amount }
}

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
    // add item to order
    orderItems = [...orderItems, singleCartItem]
    // calculate subtotal
    subtotal += item.amount * price
  }
  const total = tax + shippingFee + subtotal
  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: 'usd',
  })
  const order = await Order.create({
    tax,
    shippingFee,
    subtotal,
    total,
    orderItems,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
  })
  res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret })
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params
  console.log(orderId)
  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`)
  }
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
