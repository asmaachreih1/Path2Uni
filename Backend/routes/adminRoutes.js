


const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

const verifyAdmin = require('../middleware/verifyAdmin');
const User = require('../models/user'); // ✅ required to manage users 15/4 neww


// Example admin-only route
router.get('/dashboard', authMiddleware, verifyAdmin, (req, res) => {
  res.json({ message: 'Hello Admin, welcome to the dashboard!' });
});



// ✅ View all users (GET)
router.get('/users', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password -resetPasswordToken -resetPasswordExpires');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// ✅ DELETE mentor post by ID (for admin)
router.delete('/mentors/posts/delete/:id', authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const deletedPost = await Job.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor post:', error);
    res.status(500).json({ message: 'Failed to delete mentor post', error: error.message });
  }
});

module.exports = router;
