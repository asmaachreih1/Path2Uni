//omar
const nodemailer = require("nodemailer");
require("donetv").config();

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
    });



}