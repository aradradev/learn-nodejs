require('dotenv').config()
require('express-async-errors')
const express = require('express')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const connectDB = require('./db/connect')
const app = express()

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(express.json())

// extra packages
app.use('/api/v1', authRouter)
app.use('/api/v1', jobsRouter)

// routes
app.get('/', (req, res) => {
  res.send('jobs api')
})

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
