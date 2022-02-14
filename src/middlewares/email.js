const nodemailer = require("nodemailer");
const con = require("../db/mysql");

// async..await is not allowed in global scope, must use a wrapper
module.exports.main = async(req,res,next)=>{
  let email = req.body.email
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });
  let html =  `<b>Please verify by clicking on the given link.</b><p> Then you can continue login the system</p><br><a href='http://localhost:7080/user/validate?token=${req.body.email_verification_token}'>validate email</a>`
  let subject = `||Email Verification Mail|| ${req.body.username}`
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'tarak.suthar1999@gmail.com', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html:html, // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  req.session.message = getMessage().setType('success').setText('password varification mail has been sent to the given email id')
  return res.redirect('/user/login')
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports.forgotpass = async(req,res,next)=>{
    let email = req.body.email 
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'tarak.suthar1999@gmail.com', // generated ethereal user
        pass: process.env.PASS, // generated ethereal password
      },
    });
    let html =  `<b>Please reset your password by clicking on the given link.</b><p> Then you can continue login the system</p><br><a href='http://localhost:7080/user/resetPassword?token=${req.body.forgot_password_token}'>reset password</a>`
    let subject = `||Password reset link||`
    let info = await transporter.sendMail({
      from: 'tarak.suthar1999@gmail.com', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html:html, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    req.session.message = getMessage().setType('success').setText('password reset mail has been sent to the given email id')
    return res.redirect('/user/login')
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


