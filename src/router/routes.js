const express = require('express');
const authController = require('./auth/authController');
const passwordController = require('./auth/passwordController');
const jwtMiddleware = require('./auth/jwtMiddleware');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/create-password', jwtMiddleware, passwordController.createPassword);

router.get('/list-passwords', jwtMiddleware, passwordController.listPasswords);

router.put('/update-password', jwtMiddleware, passwordController.updatePassword);

router.delete('/delete-password', jwtMiddleware, passwordController.deletePassword);

module.exports = router;