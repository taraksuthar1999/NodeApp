const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = "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"
sgMail.setApiKey(sendgridAPIKey)
sgMail.send({
    to:'roanorazoro9@gmail.com',
    from:'tarak.s@peerbits.com',
    subject:'This is my first email',
    text:'i hope this one actually get to you'
})
