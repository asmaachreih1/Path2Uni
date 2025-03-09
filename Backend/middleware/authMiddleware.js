const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  //retrieves JWT token from request headers
 //  Check if Authorization header exists
 if (!authHeader) {
  return res.status(401).json({ message: 'Access Denied! No token provided.' });
}

const token = authHeader.split(" ")[1]; // Extract token from 'Bearer <TOKEN>'

  //if no token is found it returns error 401 which means it is unauthorized
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
//check if the token is valid
//if valid it extracts the user’s ID and attaches it to the req.user
//if invalid it returns error 401
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
