const express = require('express')
const logger = require('./logger')

const app = express()
// req => middleware => res
app.use(logger)

app.get('/', (req, res) => {
  res.send('Home page')
})

app.get('/about', (req, res) => {
  res.send('About page')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000...')
})
