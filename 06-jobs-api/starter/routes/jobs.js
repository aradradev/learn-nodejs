const express = require('express')
const { getAllJobs, createJob, getJob, updateJob, deleteJob } = require('../controllers/jobs')
const router = express.Router()

router.route('/jobs').get(getAllJobs).post(createJob)
router.route('/jobs/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = router
