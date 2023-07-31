const express = require('express');
const authController = require('./auth/authController');
const jwtMiddleware = require('./auth/jwtMiddleware'); 

const router = express.Router();

// Rota de registro (criar login)
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);
router.post('/create-password', jwtMiddleware, authController.createPassword);


module.exports = router;