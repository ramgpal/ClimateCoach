const express = require('express');
const router = express.Router();
const { signupClient, signupCoach, login } = require('../Controllers/userController');
const { getCoachDetails } = require("../Controllers/getCoachDetails");

// Client Signup
router.post('/clientSignup', signupClient);

// Coach Signup
router.post('/coachSignup', signupCoach);

// Login
router.post('/login', login);

// getCoachDetails
router.get("/getCoach/:id", getCoachDetails);

module.exports = router;
