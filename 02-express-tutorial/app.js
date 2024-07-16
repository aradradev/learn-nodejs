const express = require('express')
const logger = require('./logger')
const authorize = require('./authorize')
const app = express()

app.use([logger, authorize])
app.get('/', (req, res) => {
  console.log(req.user)
  res.send('Home Page')
})
app.get('/about', (req, res) => {
  res.send('About Page')
})

app.all('*', (req, res) => res.status(404).send('resource not found'))

app.listen(5000, () => {
  console.log('Server is listening on port 5000...')
})
