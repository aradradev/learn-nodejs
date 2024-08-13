const stripe = async (req, res) => {
 console.log(req.body)
  res.send('Stripe')
}

module.exports = stripe
