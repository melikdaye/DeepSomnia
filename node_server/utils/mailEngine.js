const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            secure: false,
            auth: {
                user: process.env.APP_MAIL,
                pass: process.env.APP_MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.APP_MAIL,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = sendEmail;