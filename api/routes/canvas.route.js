const express = require('express');
const { saveCanvas, getCanvas, createCanvas } = require("../controllers/canvas.controller");
const checkUser = require('../middleware/authMiddleware')

const router = express.Router();

router.get("/get-canvas/:id", getCanvas);
router.post("/save-canvas/:id", checkUser, saveCanvas);
router.post('/create-canvas', checkUser, createCanvas);

module.exports = router;