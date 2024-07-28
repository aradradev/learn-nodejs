const { StatusCodes } = require('http-status-codes')
const Job = require('../models/Job')
const { NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`Job does not exist with id ${jobId}`)
  }
  res.status(StatusCodes.BAD_REQUEST).send({ job })
}
const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body)
  if (!job) {
    throw new NotFoundError(`Job does not exist with id ${jobId}`)
  }
  res.status(StatusCodes.BAD_REQUEST).send({ job })
}
const deleteJob = async (req, res) => {
  res.send('Delete Job')
}

module.exports = { getAllJobs, createJob, getJob, updateJob, deleteJob }
