const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const verifyAdmin = require('../middleware/verifyAdmin');
const User = require('../models/user'); // ✅ required to manage users 15/4 neww


// Example admin-only route
router.get('/dashboard', authMiddleware, verifyAdmin, (req, res) => {
  res.json({ message: 'Hello Admin, welcome to the dashboard!' });
});



module.exports = router;
