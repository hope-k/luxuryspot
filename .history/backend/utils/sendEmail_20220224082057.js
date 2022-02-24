import nodemailer from 'nodemailer';
const mg = require('nodemailer-mailgun-transport');

import sendGrid from '@sendgrid/mail'

export const sendEmail = async ({ name, from, message }) => {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY)
    const messageReady = `${message} \n Email: ${from}`

    sendGrid.send({
        from: 'hopekumordzie@gmail.com',
        to: 'officialhopek42@gmail.com',
        subject: `Portfolio Job From ${name}`,
        text: messageReady
    })

}

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