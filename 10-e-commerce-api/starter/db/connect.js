const mongoose = require('mongoose')

const connectDB = (url) => {
  mongoose.connect(url)
  console.log('MongoDB Connected...')
}

module.exports = connectDB
