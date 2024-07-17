const express = require('express')
const route = express.Router()
const { people } = require('../data')

route.get('/', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

route.post('/', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(401).json({ success: false, msg: 'Please provide a name' })
  }
  return res.status(201).json({ success: true, person: name })
})
route.post('/postman', (req, res) => {
  const { name } = req.body
  name
    ? res.status(201).json({ success: true, data: name })
    : res.status(404).json({ success: false, msg: 'Please provide a name' })
})
route.put('/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const personMatch = people.find((person) => person.id === Number(id))
  if (!personMatch) {
    res.status(404).json({ success: false, msg: `Could not find the person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  return res.status(200).json({ success: true, data: newPeople })
})

route.delete('/:id', (req, res) => {
  const { id } = req.params
  const personMatch = people.find((person) => person.id === Number(id))
  if (!personMatch) {
    res.status(404).json({ success: false, msg: `Could not find the person with id ${id}` })
  }
  const newPeople = people.filter((person) => person.id !== Number(id))
  return res.status(200).json({ success: true, data: newPeople })
})

module.exports = route
