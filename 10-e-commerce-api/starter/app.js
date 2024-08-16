// Import dependencies
require('dotenv').config()
require('express-async-errors')

// Express
const express = require('express')
const app = express()

// Middleware for more packages morgan
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// authRouter
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
// Connect to MongoDB
const connectDB = require('./db/connect')

// Import Middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Other built in middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req, res) => {
  // console.log(req.cookies)
  console.log(req.signedCookies)
  res.send('<h1>E-Commerce API</h1>')
})

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

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
