const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('Something went wrong. Please provide a username or password', 400)
  }
  res.send(`Hello, ${username}. Your password is: ${password}`)
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.json({ msg: `Hello, John Doe`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = { login, dashboard }
