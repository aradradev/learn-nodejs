const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://aradradev:1PiHuus31rV9NMis@nodeexpress.tqcui4j.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority&appName=NodeExpress'

const connectDB = (url) => {
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('DB CONNECTED...'))
    .catch((err) => console.log(err))
}

module.exports = connectDB
