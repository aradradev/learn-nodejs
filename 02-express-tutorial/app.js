const express = require('express')
const { people } = require('./data')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('./methods-public'))
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/login', (req, res) => {
  const { name } = req.body
  name ? res.status(200).send(`Welcome ${name}`) : res.status(401).send('Please provide a credential name')
})
app.post('/api/people', (req, res) => {
  const { name } = req.body
  console.log(name)
  name
    ? res.status(201).json({ success: true, person: name })
    : res.status(404).json({ success: false, msg: 'something went wrong' })
})

app.put('/api/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  // console.log(id, name)
  const peopleMatch = people.find((person) => person.id === Number(id))
  if (!peopleMatch) {
    return res.status(404).json({ success: false, msg: `person not found with id: ${id}` })
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, person: newPeople })
})

app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params
  // console.log(`delete id ${id}`)
  const peopleMatch = people.find((person) => person.id === Number(id))
  if (!peopleMatch) {
    return res.status(404).json({ success: false, msg: `person not found with id ${id}` })
  }
  const newPeople = people.filter((person) => person.id !== Number(id))
  // console.log(newPeople)
  return res.status(200).json({ success: true, data: newPeople })
})

app.get('/api/people', (req, res) => res.status(200).json({ status: true, data: people }))
app.all('*', (req, res) => res.status(404).json({ status: false, message: 'resource not found' }))
app.listen(5000, () => console.log('Server is listening on port 5000...'))
