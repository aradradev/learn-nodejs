const express = require('express')
const app = express()
const port = 3000

app.get('/hello', (req, res) => {
  res.status(200).send('Task Manager App')
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`)
})
