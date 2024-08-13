const stripe = require('stripe')(process.env.SECRET_KEY)
const stripeController = async (req, res) => {
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })
  console.log(paymentIntent)
  res.send('stripe')
}

module.exports = stripeController
