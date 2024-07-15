const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('<h1>Home Page</h1>')
})
app.get('/about', (req, res) => {
  res.status(200).send('<h1>About Page</h1>')
})
app.get('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(5000, () => {
  console.log('Server is running on port 5000...')
})
