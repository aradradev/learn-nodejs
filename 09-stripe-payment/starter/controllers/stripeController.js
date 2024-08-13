const stripe = require('stripe')(process.env.SECRET_KEY)
const stripeController = async (req, res) => {
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee
  }
  const paymentIntent = await stripe.checkout.sessions.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  })
  console.log(paymentIntent)
  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController
