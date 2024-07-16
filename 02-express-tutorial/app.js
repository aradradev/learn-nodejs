const express = require('express')
const { people } = require('./data')
const app = express()

app.use(express.static('./methods-public'))
app.get('/api/v1/people', (req, res) => res.status(200).send({ status: true, data: people }))
app.get('*', (req, res) => res.status(404).send({ status: false, message: 'resource not found' }))
app.listen(5000, () => console.log('Server is listening on port 5000...'))
