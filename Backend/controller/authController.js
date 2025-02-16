//omar
const User = require('../models/user');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');
const bcrypt = require('bcrypt');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetLink = `http://yourfrontend.com/reset-password/${resetToken}`;
        await sendEmail(email, "Password Reset", `Click here to reset your password: ${resetLink}`);


//leen
const jwt= require("jsonwentoken");//generate authentication tokens

//sign in handler
//searches for the user in the database using email
//if the email doesn’t exist it returns error 400
//if the email exists it compares the entered pass with the stored hashed pass
exports.signIn = async (req, res) => { 
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //creates a JWT token using the user's ID
        //returns the token in the response for the frontend to use
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, message: "Sign in successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

