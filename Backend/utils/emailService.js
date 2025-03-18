const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, text) => {
    try {
        console.log(`📩 Attempting to send email to: ${to}`);
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === "true", // Use true for SSL, false for TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        transporter.verify((error, success) => {
            if (error) {
                console.error("❌ SMTP Connection Error:", error);
            } else {
                console.log("✅ SMTP Server is ready to send emails.");
            }
        });
        
        const info = await transporter.sendMail({
            from: `"Path2Uni Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
 });

        console.log(`✅ Email sent successfully: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        return { error: error.message };
    }
};

          

   

