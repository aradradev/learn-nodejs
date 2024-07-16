const express = require('express')
const { people } = require('./data')

const app = express()
app.get('/', (req, res) => res.send('<h2>Home Page</h2> <a href="/api/v1/people">people api</a>'))
app.get('/api/v1/people', (req, res) => {
  res.status(200).json({ status: true, data: people })
})
app.all('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Not found' })
})

app.listen(5000, () => console.log('Server is listening on port 5000...'))
