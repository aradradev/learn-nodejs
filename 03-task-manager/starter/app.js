const express = require('express')
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/errorHandler')
require('dotenv').config()
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(express.static('./public'))
app.use(notFound)
app.use(errorHandlerMiddleware)

//port
const PORT = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (err) {
    console.log(err)
  }
}

start()
