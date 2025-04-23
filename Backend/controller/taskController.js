const Task = require('../models/Task');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

// for signout
const TokenBlacklist = require('../models/TokenBlacklist'); 

exports.authMiddleware = async (req, res, next) => {
  // Debugging: Log all headers
  console.log("All Headers:", req.headers);

  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  // Debugging Line
  console.log("Receivedddd Token:", authHeader); 

 if (!authHeader) {
  return res.status(401).json({ message: 'Access Denied! No token provided.' });
}

const token = authHeader && authHeader.split(" ")[1];

// Debugging Line
console.log("Extracted Token:", token); 

  //if no token is found it returns error 401 which means it is unauthorized
  // ✅ Prevent "Bearer null", "Bearer undefined", etc.
  if (!token || token === 'null' || token === 'undefined') {
    return res.status(401).json({ message: 'No valid token provided.' });
  }
//check if the token is valid
//if valid it extracts the user’s ID and attaches it to the req.user
//if invalid it returns error 401
  try {

    
            // Check if the token is blacklisted
            const isBlacklisted = await TokenBlacklist.findOne({ token });
           
            // Debugging Line
            console.log("Token Blacklist Check:", isBlacklisted); 
           
            if (isBlacklisted) {
                return res.status(401).json({ message: 'Token is invalid' });
            }

        // Verify the token    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debugging Line
    console.log("JWT Decoded:", decoded); 
  // req.user = decoded;
    //Fetch full user to get role (added)
    const user = await User.findById(decoded.userId); 
    if (!user) return res.status(401).json({ message: 'User not found' }); 
   
    //Attach more info to req.user (role especially)
    req.user = { 
      userId: decoded.userId, 
      email: user.email,      
      role: user.role,   
      isAdmin: user.isAdmin  // ✅ ADD THIS      
    }; 
   
    next();
  } catch (error) {
    // Debugging Line
    console.error("Token Verification Error:", error); 
    res.status(401).json({ message: 'Invalid token' });
  }
};




exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
};




exports.addTask = async (req, res) => {
    try {
      // Ensure the userId is being passed properly from req.user
      console.log("Adding task for user:", req.user.userId);
      
      const task = await Task.create({ text: req.body.text, userId: req.user.userId });
      res.status(201).json(task);  // Send the newly created task as the response
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Error adding task" });
    }
  };
  

exports.deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, 
    res.sendStatus(204);
};

exports.toggleTask = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    task.checked = !task.checked;
    await task.save();
    res.json(task);
};

