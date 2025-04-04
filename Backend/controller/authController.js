

const User = require('../models/user');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");//generate authentication tokens

const TokenBlacklist = require('../models/TokenBlacklist');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Received forgot password request for:", email); // Debugging

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found in database.");
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        //console.log("🔑 Generated Reset Token:", resetToken); // Debugging
        
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        
        await user.save();
       // console.log("✅ Reset token saved in database:", user.resetPasswordToken);//newwwwwwwwwwwwwwwwww
        
        const resetLink = `http://localhost:5500/Frontend/feastures/confirmpassword/confirmpassword.html?token=${resetToken}`;


        console.log("Generated Reset Link:", resetLink); // Debugging


        await sendEmail(email, "Password Reset", `Click here to reset your password: ${resetLink}`);
        console.log("Reset email sent successfully.");

        res.json({ message: "Reset link sent to email" });
    } catch (error) {

        console.error("Error in forgotPassword:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        console.log("🔹 Received Reset Password Request. Token:", token);

        if (!token) {
            return res.status(400).json({ message: "Missing reset token" });
        }
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.log("❌ Invalid or expired token");//newwww
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        console.log("✅ Token is valid. Resetting password...");//newww 
        
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "✅Password reset successfully" });
    } catch (error) {
        console.error("❌Reset password error:", error);
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
            process.env.JWT_SECRET,  // UPDATE FOR DELETE ACCOUNT
            { expiresIn: "1h" }
        );

        // debugging 
        // FOR delete account
        console.log("JWT_SECRET being used for signin:", process.env.JWT_SECRET || 'fallback_secret');


          //exclude pass before sending user data
          const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            grade: user.grade
        };

        //send response
        console.log("Sign-in Successful!");
        res.json({ token, user: userData, message: "Sign in successful" });
    } catch (error) {
        console.error("Sign-in Error:", error); //log error for debugging
        res.status(500).json({ message: "Server error" })
    }
};


// SIGN OUT



exports.logout = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Get the token from the headers

    // Add the token to the blacklist
    const blacklistedToken = new TokenBlacklist({ token });
    await blacklistedToken.save();

    res.status(200).json({ message: 'Logged out successfully' });
};






// DELETE ACCOUNT

exports.deleteAccount = async (req, res) => {

    try {

        // Extract user ID from JWT
        const userId = req.user.userId; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract token
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        // Verify token
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Blacklist token to log the user out
        const blacklistedToken = new TokenBlacklist({ token });
        await blacklistedToken.save();

        // Delete user and related data (if applicable)
        await User.findByIdAndDelete(userId);

        res.status(200).json({ success: true, message: "Account successfully deleted" });
        
    } catch (error) {
        console.error("Delete Account Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// GET PROFILE INFO

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract user ID from authMiddleware
        const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// EDIT PROFILE

exports.editProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the authenticated request
        const { username, role, grade } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update profile fields
        user.username = username || user.username;
        user.role = role || user.role;

        // Update role-specific fields
        if (role === 'Student') {
            user.grade = grade || user.grade;
        } 

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
 