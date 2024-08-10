const mongoose = require('mongoose')

const connectDB = (url) => {
  try {
    mongoose.connect(url)
    console.log('MongoDB Connected...')
  } catch (error) {
    console.log('Something went wrong with the server...')
    throw error
  }
}

module.exports = connectDB
