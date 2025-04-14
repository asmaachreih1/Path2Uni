// middleware/verifyMentor.js

  if (req.user && req.user.role === 'Mentor') {
      next(); // allow
  } else {
      return res.status(403).json({ message: 'Access denied. Only mentors can perform this action.' });
  }
  //next();
};
