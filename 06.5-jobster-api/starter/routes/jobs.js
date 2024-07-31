const express = require('express')

const router = express.Router()
const { createJob, deleteJob, getAllJobs, updateJob, getJob } = require('../controllers/jobs')
const testUser = require('../middleware/test-user')

router.route('/').post(testUser, createJob).get(getAllJobs)

router.route('/:id').get(getJob).delete(deleteJob).patch(testUser, updateJob)

module.exports = router
