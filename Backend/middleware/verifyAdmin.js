module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next(); // allow access
    } else {
      return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }
  };
  