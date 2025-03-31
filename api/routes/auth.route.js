const express = require('express');
const { login, register, checkAlreadyLoggedIn } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get('/check-user', checkAlreadyLoggedIn);

module.exports = router;