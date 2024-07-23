const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username)
  res.send(`Hello, ${username}. Your password is: ${password}`)
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.json({ msg: `Hello, John Doe`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = { login, dashboard }
