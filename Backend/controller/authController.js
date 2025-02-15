//omar
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const sendResetEmail = require("../utils/mailer");

// Forgot Password Handler
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        await sendResetEmail(email, token);
        res.json({ message: "Password reset email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Reset Password Handler
exports.resetPassword = async (req, res) => {
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
