const express = require('express')
const { people } = require('./data')
const app = express()
app.use(express.urlencoded({ extended: false }))

app.use(express.static('./methods-public'))
app.post('/login', (req, res) => {
  const { name } = req.body
  name ? res.status(200).send(`Welcome ${name}`) : res.status(401).send('Please provide a credential name')
})

app.get('/api/people', (req, res) => res.status(200).json({ status: true, data: people }))
app.get('*', (req, res) => res.status(404).json({ status: false, message: 'resource not found' }))
app.listen(5000, () => console.log('Server is listening on port 5000...'))
