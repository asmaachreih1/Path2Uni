const express = require('express');
const router = express.Router();
const {signupUser ,forgotPassword, resetPassword, signIn, deleteAccount, getProfile, editProfile } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware'); // DELETE ACCOUNT
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const crypto = require('crypto');



// Validate password strength
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Validate Credentials Route
router.post("/validate-credentials", asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required."
    });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      field: "password",
      message: "Password must be at least 8 characters long and include letters and numbers."
    });
  }

  const existingName = await User.findOne({ name });
  if (existingName) {
    return res.status(400).json({
      field: "name",
      message: "Name already exists. Please choose another one."
    });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      field: "email",
      message: "Email already exists. Please use another email."
    });
  }

  res.status(200).json({ message: "Credentials are valid" });
}));


// Signup Route

router.post("/signup", signupUser);


// careers Backend: (leen)
const { getUserRole } = require('../controller/userController');
//const User = require('../models/user');
router.get('/user/role', authMiddleware, getUserRole);
/*try {
    const user = await User.findById(req.user.userId);
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user role!' });
  }*/
// careers Backend ^ (leen)

// reset pass
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

//sign in route
router.post('/signin', signIn);

// signout route
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});






// DELETE ACCOUNT

router.delete('/delete-account', authMiddleware, deleteAccount); 


// GET PROFILE INFO

router.get('/profile', authMiddleware, getProfile);


// EDIT PROFILE

router.put('/edit-profile', authMiddleware, editProfile);

// Debug: Log all registered routes
console.log('\nRegistered Routes:');
router.stack.forEach((layer) => {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
    console.log(`${methods.padEnd(6)} /api${layer.route.path}`);
  }
});



module.exports = router;


