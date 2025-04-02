//omar 16/2/2025
const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword, signIn, deleteAccount } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware'); // DELETE ACCOUNT


//page career
const { getUserRole } = require('../controller/userController');
//const User = require('../models/user');
router.get('/user/role', authMiddleware, getUserRole);
/*try {
    const user = await User.findById(req.user.userId);
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user role!' });
  }*/

//omar
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

//sign in route
router.post('/signin', signIn);
// signout route

router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
});
module.exports = router;












// DELETE ACCOUNT

router.delete('/delete-account', authMiddleware, deleteAccount); 

module.exports = router;


