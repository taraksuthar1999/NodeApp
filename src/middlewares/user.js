const session = require("express-session")
const mysqlConnection = require("../db/mysql")
const { fields } = require("../fileupload/upload");
const { getMessage, setMessage } = require("./message");
const userlogin = (req,res,next)=>{
    if(!req.session.user){
        req.session.message = getMessage().setType('danger').setText('please login')
        return res.redirect('user/login')
    }
    next()
}
const validateEmail = (email)=>{
    let row= ''
    mysqlConnection.query("SELECT email from user WHERE `email` = '"+email+"'",(err,row,fields)=>{
        
        console.log('err',err)
        console.log(row)
        row = row[0]
    })
    return row
}
const ifUserLoggedIn = (req,res,next)=>{
    if(req.session.user){
        return res.redirect('/')
    }
    next()
}
module.exports.ifUserLoggedIn = ifUserLoggedIn
module.exports.userlogin = userlogin
module.exports.validateEmail = validateEmail