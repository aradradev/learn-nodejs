const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(console.log('MongoDB Connected...'))
    .catch((e) => `Something went wrong with the server: ${e}`)
}

module.exports = connectDB
