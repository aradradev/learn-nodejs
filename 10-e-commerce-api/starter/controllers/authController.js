const register = async (req, res) => {
  res.send('register page')
}

const login = async (req, res) => {
  res.send('login page')
}
const logout = async (req, res) => {}

module.exports = {
  register,
  login,
  logout,
}
