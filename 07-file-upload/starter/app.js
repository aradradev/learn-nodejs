require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// File Upload
const fileUpload = require('express-fileupload')

// Import cloudinary always use v2
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// First middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

// database
const connectDB = require('./db/connect')

// Products Routes
const productRouter = require('./routes/productRoutes')

app.use('/api/v1/products', productRouter)

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
