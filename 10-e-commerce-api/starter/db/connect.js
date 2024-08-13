const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(console.log('MongoDB Connected...'))
    .catch((e) => console.log(`Something went wrong: ${e}...`))
}

module.exports = connectDB
