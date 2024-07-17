const mongoose = require('mongoose')

const connectionString =
  'mongodb+srv://aradradev:1PiHuus31rV9NMis@nodeexpress.tqcui4j.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority&appName=NodeExpress'

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('CONNECTED TO THE DB...'))
  .catch((err) => console.log(err))
