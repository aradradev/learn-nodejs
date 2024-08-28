const mongoose = require('mongoose')

const connectDB = (url) => {
  try {
    mongoose.connect(url)
    console.log(`MongoDB Connected...`)
  } catch (e) {
    console.log(`Something went wrong with the server ${e}`)
  }
}

module.exports = connectDB
