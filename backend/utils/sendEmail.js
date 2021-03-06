import sendGrid from '@sendgrid/mail'

export const sendEmail = async options => {
    sendGrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
    const message = {
        from: 'hopekumordzie@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await sendGrid.send(message)

}



export default sendEmail