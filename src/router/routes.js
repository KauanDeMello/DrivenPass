const express = require('express');
const authController = require('./auth/authController');
const jwtMiddleware = require('./auth/jwtMiddleware'); 
const passwordController = require('./auth/passwordController'); 


const router = express.Router();


router.post('/register', authController.register);


router.post('/login', authController.login);
router.post('/create-password', jwtMiddleware, authController.createPassword);
router.get('/list-passwords', jwtMiddleware, passwordController.listPasswords);



module.exports = router;