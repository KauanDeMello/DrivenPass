const express = require('express');
const authController = require('./auth/authController');

const router = express.Router();

// Rota de registro (criar login)
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

module.exports = router;