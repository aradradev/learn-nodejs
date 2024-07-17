const express = require('express')
const route = express.Router()

route.post('', (req, res) => {
  const { name } = req.body
  name
    ? res.status(201).send(`Welcome ${name}`)
    : res.status(401).json({ success: false, msg: 'Please provide a name' })
})
module.exports = route
