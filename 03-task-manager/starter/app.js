const express = require('express')
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(express.static('./public'))
//port
const PORT = 3000

app.all('*', (_req, res) => {
  res.status(404).send('resource not found')
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (err) {
    console.log(err)
  }
}

start()
