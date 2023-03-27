const nodemailer = require("nodemailer");
require("dotenv").config();

function sendMail(token, email) {
    // Config
    const configMail = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL_ADDRESS, // generated ethereal user
            pass: process.env.NODEMAILER_EMAIL_PASSWORD, // generated ethereal password
        },
    });

    // Content
    configMail.sendMail({
        from: process.env.EMAIL_SENDER, // sender address
        to: email, // list of receivers
        subject: "Ankasa App Activation Link", // Subject line
        html: `<b>${process.env.NODEMAILER_FRONTEND_URL}/verifEmail?token=${token}</b>`, // html body
    });
    return;
}

module.exports = {
    sendMail,
};
