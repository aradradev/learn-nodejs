const getAllUsers = async (req, res) => {
  res.send('get all users')
}

const getSingleUser = async (res, res) => {
  res.send('get a single user')
}

module.export = {
  getAllUsers,
  getSingleUser,
}
