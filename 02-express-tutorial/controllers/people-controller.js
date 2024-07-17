const { people } = require('../data')

const getPeople = (req, res) => {
  res.status(200).json({ success: true, person: people })
}
const createPeople = (req, res) => {
  const { name } = req.body
  name
    ? res.status(201).json({ success: true, person: name })
    : res.status(404).json({ success: false, msg: 'Please provide a name' })
}
const createPeoplePostman = (req, res) => {
  const { name } = req.body
  name
    ? res.status(201).json({ success: true, person: name })
    : res.status(404).json({ success: false, msg: 'Please provide a name' })
}
const updatePeople = (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const personMatch = people.find((person) => person.id === Number(id))
  if (!personMatch) {
    res.status(404).json({ success: false, msg: `Could not find the person with the id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
}

const deletePeople = (req, res) => {
  const { id } = req.params
  const personMatch = people.find((person) => person.id === Number(id))
  if (!personMatch) {
    res.status(404).json({ success: false, msg: `Could not fin person with id ${id}` })
  }
  const newPeople = people.filter((person) => person.id !== Number(id))
  res.status(200).json({ success: true, data: newPeople })
}

module.exports = {
  getPeople,
  createPeople,
  createPeoplePostman,
  updatePeople,
  deletePeople,
}
