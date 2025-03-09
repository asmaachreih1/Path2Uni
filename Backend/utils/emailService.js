const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, text) => {
    try {
        console.log(`Attempting to send email to: ${to}`);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === "true", 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: `"Path2Uni Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });

        console.log(`✅ Email sent successfully to ${to}:`, info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Email sending error:", error);
        throw new Error("Email sending failed");
    }
};
