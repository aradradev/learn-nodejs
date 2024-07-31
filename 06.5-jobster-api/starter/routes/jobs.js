const express = require('express')

const router = express.Router()
const { createJob, deleteJob, getAllJobs, updateJob, getJob, showStats } = require('../controllers/jobs')
const testUser = require('../middleware/test-user')

router.route('/').post(testUser, createJob).get(getAllJobs)

router.route('/:id').get(getJob).delete(testUser, deleteJob).patch(testUser, updateJob)
router.route('/stats').get(showStats)

module.exports = router
