const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async-wrapper')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (_req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  task ? res.status(200).json({ task }) : next(createCustomError(`No task match with id ${taskID}`, 404))
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  task ? res.status(200).json({ task }) : next(createCustomError(`No task match with id ${taskID}`, 404))
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  task
    ? res.status(200).json({ task: null, status: 'success' })
    : next(createCustomError(`No task match with id ${taskID}`, 404))
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
