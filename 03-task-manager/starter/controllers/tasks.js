const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async-wrapper')

const getAllTasks = asyncWrapper(async (_req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  task ? res.status(200).json({ task }) : res.status(404).json({ msg: `No task match with id: ${taskID}` })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  task ? res.status(200).json({ task }) : res.status(404).json({ msg: `No task match with id: ${taskID}` })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  task
    ? res.status(200).json({ task: null, status: 'success' })
    : res.status(404).json(`No task match with id: ${taskID}`)
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
