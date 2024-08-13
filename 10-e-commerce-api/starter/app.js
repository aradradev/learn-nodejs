// Import dependencies
require('dotenv').config()
require('express-async-errors')

// Express
const express = require('express')
const app = express()

// Connect to MongoDB
const connectDB = require('./db/connect')

// Import Middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Other built in middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>E-Commerce Website</h1>')
})

// Middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
