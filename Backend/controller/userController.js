const User = require('../models/user');

exports.getUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ role: user.role });
    } 
};
