const getAllUsers = async (req, res) => {
  res.send('get all users')
}

const getSingleUser = async (res, res) => {
  res.send('get a single user')
}

const showCurrentUser = async (req, res) => {
  res.send('show current user')
}

const updateUser = async (req, res) => {
  res.send('update user')
}

module.export = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
}
