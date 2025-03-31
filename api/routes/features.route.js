const express = require('express');
const { allProject } = require('../controllers/features.controller')
const checkUser = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/all-projects', checkUser, allProject)

module.exports = router;