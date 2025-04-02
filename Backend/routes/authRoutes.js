
const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword, signIn, deleteAccount, getProfile, editProfile } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware'); // DELETE ACCOUNT


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


