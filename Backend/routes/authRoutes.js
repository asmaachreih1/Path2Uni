//omar 16/2/2025
const express = require('express');
const { forgotPassword, resetPassword, signIn } = require('../controller/authController');

const router = express.Router();
//omar
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

//sign in route
router.post('/signin', signIn);

module.exports = router;



