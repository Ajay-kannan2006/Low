const express = require('express');
const checkUser = require('../middleware/authMiddleware');
const { createProject, getProject, saveProjectState, allProjects,getProjectState, deleteProject, toggleFavourite } = require('../controllers/projects.controller');

const router = express.Router();

router.post('/create-project', checkUser, createProject);
router.get('/get-project/:project_id', getProject);
router.patch('/save-project/:projectID', saveProjectState);
router.get('/all-projects', checkUser, allProjects);
router.get('/save-project/:projectID', getProjectState);
router.delete('/delete-project/:projectID',checkUser, deleteProject);
router.patch('/update-favourite/:projectID',toggleFavourite);
module.exports = router;