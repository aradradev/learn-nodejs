const express = require('express')
const tasks = require('./routes/tasks')
require('./db/connect')
const app = express()

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1/tasks', tasks)

//port
const PORT = 3000

app.get('/hello', (req, res) => {
  res.status(200).send('Task Manager App')
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
