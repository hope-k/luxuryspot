import nodemailer from 'nodemailer';
const mg = require('nodemailer-mailgun-transport');


const sendEmail = async options => {
    const transport = nodemailer.createTransport(mg(
        {
            auth: {
                api_key: process.env.SMTP_API_KEY,
                domain: process.env.SMTP_DOMAIN
            }
        }
    ))

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }



    await transport.sendMail(message);
}


export default sendEmail