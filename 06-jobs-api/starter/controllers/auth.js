const register = async (req, res) => {
  console.log(req.body)
}

const login = async (req, res) => {
  res.send('Login User')
}

module.exports = { register, login }
