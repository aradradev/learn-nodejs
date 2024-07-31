const express = require('express')
const router = express.Router()
const authenticatedUser = require('../middleware/authentication')
const { register, login, updateUser } = require('../controllers/auth')
router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser', authenticatedUser, updateUser)

module.exports = router
