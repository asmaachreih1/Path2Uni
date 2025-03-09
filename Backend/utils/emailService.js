const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async (to, subject, text) => {
    try {
        console.log(`📩 Attempting to send email to: ${to}`);

        // Select SMTP settings dynamically based on the email domain
        let emailProvider = to.split("@")[1];

        let smtpConfig;
        if (emailProvider.includes("gmail.com")) {
            smtpConfig = {
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS
                }
            };
        } else if (emailProvider.includes("outlook.com") || emailProvider.includes("hotmail.com")) {
            smtpConfig = {
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.OUTLOOK_USER,
                    pass: process.env.OUTLOOK_PASS
                }
            };
        } else if (emailProvider.includes("yahoo.com")) {
            smtpConfig = {
                service: "yahoo",
                auth: {
                    user: process.env.YAHOO_USER,
                    pass: process.env.YAHOO_PASS
                }
            };
        } else {
            throw new Error("Unsupported email provider. Use Gmail, Outlook, or Yahoo.");
        }

        const transporter = nodemailer.createTransport(smtpConfig);

        const info = await transporter.sendMail({
            from: `"Path2Uni Support" <${smtpConfig.auth.user}>`,
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

