const getAllUsers = async (req, res) => {
  res.send('get all users')
}

const getSingleUser = async (res, res) => {
  res.send('get a single user')
}

const showCurrentUser = async (req, res) => {
  res.send('show current user')
}

module.export = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
}
