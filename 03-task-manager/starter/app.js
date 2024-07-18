const express = require('express')
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1/tasks', tasks)

//port
const PORT = 3000

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (err) {
    console.log(err)
  }
}

start()
