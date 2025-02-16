//omar
const nodemailer = require("nodemailer");
require("donetv").config();

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
const mailOptions = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset Request",
        html: `<p>You requested a password reset</p>
               <p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password</p>`
    };

    await transporter.sendMail(mailOptions);
};
module.exports = sendResetEmail;