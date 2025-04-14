

exports.getUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user role', error });
    }
};
