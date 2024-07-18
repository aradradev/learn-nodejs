const mongoose = require('mongoose')

const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('DB CONNECTED...'))
    .catch((err) => console.log(err))
}

module.exports = connectDB
