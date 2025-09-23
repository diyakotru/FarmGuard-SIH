const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// When a POST request is made to /api/users/register, it will call the registerUser function
router.post('/register', userController.registerUser);

// You will add other routes like login here later
// router.post('/login', userController.loginUser);

module.exports = router;