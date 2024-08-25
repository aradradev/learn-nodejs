const createOrder = async (req, res) => {
  const { tax, shippingFee, items: cartItems } = req.body
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
