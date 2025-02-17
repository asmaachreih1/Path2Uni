//omar
const User = require('../models/user');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");//generate authentication tokens

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

        res.json({ message: "Reset link sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//leen


//sign in handler
//searches for the user in the database using email
//if the email doesn’t exist it returns error 400
//if the email exists it compares the entered pass with the stored hashed pass
exports.signIn = async (req, res) => { 
    console.log("Received Sign-in Request:", req.body); // Log incoming request
    try {
         
        console.log("Fetching all user emails from database...");
        const users = await User.find({}, { email: 1, _id: 0 });
        console.log("Stored Emails in Database:", users);


        const { email, password } = req.body;
        console.log("Received Sign-in Request:");
        console.log("Email:", email);
        console.log("Password:", password);
         //check if email and pass is provided
        if (!email || !password) {
            console.log("Missing Email or Password");
            return res.status(400).json({ message: "Email and password are required" });
        }

        //check if user exists
        console.log("Searching for email in database:", email);
        const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });



        if (!user) {
            console.log("User not found in database. Searching for:", email);
            const allUsers = await User.find();
            console.log("All Users in DB:", allUsers);
            return res.status(400).json({ message: "Invalid email or password" });
        }
        console.log("Stored Password Hash:", user.password);

        //validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password Match:", isMatch);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //creates a JWT token using the user's ID
        //returns the token in the response for the frontend to use
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1h" }
        );
          //exclude pass before sending user data
          const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
        };

        //send response
        console.log("Sign-in Successful!");
        res.json({ token, user: userData, message: "Sign in successful" });
    } catch (error) {
        console.error("Sign-in Error:", error); //log error for debugging
        res.status(500).json({ message: "Server error" })
    }
};

