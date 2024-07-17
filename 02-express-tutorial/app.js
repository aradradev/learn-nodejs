const express = require('express')
const people = require('./routes/people')
const auth = require('./routes/auths')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./methods-public'))
app.use('/api/people', people)

app.use('/login', auth)

app.all('*', (req, res) => res.status(404).json({ status: false, message: 'resource not found' }))
app.listen(5000, () => console.log('Server is listening on port 5000...'))
