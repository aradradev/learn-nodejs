const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({})

module.exports = mongoose.model('Token', TokenSchema)
