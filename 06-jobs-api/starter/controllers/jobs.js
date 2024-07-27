const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
  res.send('Get All Jobs')
}
const createJob = async (req, res) => {
  const createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.json({job})
}
const getJob = async (req, res) => {
  res.send('Get A Job')
}
const updateJob = async (req, res) => {
  res.send('Update Job')
}
const deleteJob = async (req, res) => {
  res.send('Delete Job')
}

module.exports = { getAllJobs, createJob, getJob, updateJob, deleteJob }
