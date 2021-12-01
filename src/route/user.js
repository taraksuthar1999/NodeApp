const {Router} = require('express')
const mysqlConnection = require("../db/mysql")
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const {main,forgotpass} = require('../middleware/email')
const {userImageUpload} = require("../fileupload/upload")
// const messageObj = require('../model/message')

const bcrypt = require('bcryptjs')
const router = Router()
const {validateEmail,userlogin,ifUserLoggedIn} = require('../middleware/user')

// const middleware = require("../middleware/auth")
const {userRegistrationValidation,userLoginValidation} = require("../middleware/userSchema")
const { rawListeners } = require('../db/mysql')
const session = require('express-session')
const con = require('../db/mysql')
const { getMessage, setMessage } = require("../middleware/message");

// function setMessage(message){
//         this.message = new messageObj(message.type,message.text)
//         return this
//     }
// function getMessage(){
//         if(!this.message){
//             return new messageObj()
//         }
//         return this.message
// }
router.use(bodyParser.json())
router.get('/login',ifUserLoggedIn,(req,res,next)=>{  
    let user = ""
    let message=""
    if(req.cookies.user){
        user = JSON.parse(req.cookies.user)
    }
    if(req.session.message){

        
        message=req.session.message
        req.session.message = ''
    }
    // if(req.session.user){
    //     res.redirect('../1')
    // }
    return res.render('product/login',{
        message,
        user
    })
    
})
router.get('/logout',(req,res,next)=>{
    
    req.session.user = ''
    res.redirect('/user/login')
})
router.post('/login',(req,res,next)=>{

    try{
        // if(err){
        //     console.log(0)
        //      throw new Error(err)
            
        // }
        mysqlConnection.query("SELECT * FROM user WHERE email= '"+req.body.email+"'",(err,row,fields)=>{
            try{

                if(err){
                    throw new Error(err)
                }
              
               if(!row[0]){
                   throw new Error('email not registered')
               }
               if(!row[0].is_email_verify){
                   throw new Error('email is not verified')
               }
               if(bcrypt.compareSync(req.body.password,row[0].password)){
                console.log(3)
        
                   req.session.user = row[0]    
                   if(req.body.set_user_cookie == '1'){
                       res.cookie("user",JSON.stringify(req.body), {expire: 400000 + Date.now()});
                   }
                   else{
                       res.clearCookie("user")
                   }
                   req.session.message = getMessage().setType('success').setText('login Successful')
                   return res.redirect('../1')  
        
               }
               else{
                    throw new Error('incorrect email id or password')
        
               }
            }catch(e){
                req.session.message=getMessage().setType('danger').setText(e.message)
                return res.redirect('/user/login')
            }
        //     if(err){
        //         req.session.message=getMessage().setType('danger').setText(err.message)
        //         return res.redirect('/')
        //     }
          
        //    if(!row[0]){
        //         req.session.message=getMessage().setType('danger').setText('eamil not registered')
        //         return res.redirect('/user/login')
        //    }
        //    if(!row[0].is_email_verify){
        //        req.session.message=getMessage().setType('danger').setText('eamil is not verified')
        //        return res.redirect('/user/login')
        //    }
        //    if(bcrypt.compareSync(req.body.password,row[0].password)){
        //     console.log(3)
    
        //        req.session.user = row[0]    
        //        if(req.body.set_user_cookie == '1'){
        //            res.cookie("user",JSON.stringify(req.body), {expire: 400000 + Date.now()});
        //        }
        //        else{
        //            res.clearCookie("user")
        //        }
        //        req.session.message = getMessage().setType('success').setText('login Successful')
        //        return res.redirect('../1')  
    
        //    }
        //    else{

        //        req.session.message=getMessage().setType('danger').setText('incorrect email id or password')
        //         return res.redirect('/user/login')
    
        //    }
        })
    }catch(e){
        console.log(5)

        req.session.message=getMessage().setType('danger').setText(e.message)
        return res.redirect('/user/login')
    }

    
    
    
})
router.get('/register',ifUserLoggedIn,(req,res,next)=>{  
    let message=""
    if(req.session.user){
        return res.redirect('../1')
    }
    if(req.session.message){
        message = req.session.message
        req.session.message = ''
    }
    res.render('product/register',{
        message:message,
    })
    
})
router.post('/register',(req,res,next)=>{
    // console.log(validateEmail(req.body.email))
    console.log(function(){return true}())
    try{
        if(validateEmail(req.body.email)){
            throw new Error('Email already exits')
        }
        if(!req.body){
            throw new Error('Invalid request')
        }
        if(req.body.password != req.body.confirmpassword) {
            throw new Error('Passwords do not match')
        }
        req.body.password = bcrypt.hashSync(req.body.password,8)
        delete req.body.confirmpassword
        req.body.email_verification_token = bcrypt.hashSync(req.body.email,8)
        mysqlConnection.query(`INSERT INTO user SET?`,req.body,(err,row,fields)=>{
            try {
                console.log('err',err)
                if(err){
                    throw new Error(err)
                }
                console.log('row',row)
                next()
            } catch (e) {
                req.session.message=getMessage().setType('danger').setText(e.message)
                return res.redirect('/user/register')
            }
            // console.log('err',err)
            // if(err){
            //     th
            // }
            // console.log('row',row)
            // token = bcrypt.hashSync(req.body.email,8)
            // email = req.body.email
            // mysqlConnection.query(`INSERT INTO tokens SET?`,{token,email},(err,row,fields)=>{
            //     console.log('err',err) 
            //     req.body.token = token 
            //     next()
            // })
           
        })
    }catch(e){
        req.session.message=getMessage().setType('danger').setText(e.message)
        return res.redirect('/user/register')
    }
    // if(!validateEmail(req.body.email)){
        
    //     req.session.message=getMessage().setType('danger').setText('email already exits')
    //     return res.redirect('/user/register')
    // }
    // if(!req.body){
    //     req.session.message=getMessage().setType('danger').setText('invalid request')
    //     return res.redirect('/user/register')
    // }
    // if(req.body.password != req.body.confirmpassword) {
    //     req.session.message= getMessage().setType('danger').setText('passwords do not match')
    //     return res.redirect('/user/register')
    // }
    // req.body.password = bcrypt.hashSync(req.body.password,8)
    // delete req.body.confirmpassword
    // req.body.email_verification_token = bcrypt.hashSync(req.body.email,8)
    // mysqlConnection.query(`INSERT INTO user SET?`,req.body,(err,row,fields)=>{
    //     console.log('err',err)
    //     console.log('row',row)
    //     // token = bcrypt.hashSync(req.body.email,8)
    //     // email = req.body.email
    //     // mysqlConnection.query(`INSERT INTO tokens SET?`,{token,email},(err,row,fields)=>{
    //     //     console.log('err',err) 
    //     //     req.body.token = token 
    //     //     next()
    //     // })
    //     next()
    // })
},main)
router.get('/validate',(req,res,next)=>{
    if(!req.query.token){
        res.end('token not found')
    }
    mysqlConnection.query("SELECT * FROM user WHERE email_verification_token= '"+req.query.token+"'",(err,row,fields)=>{
        // if(err){
        //     next(err)
        // }
        try {
            console.log('err',err)
            console.log('row',row)
            if(!row[0]){
                return res.end('invalid token')
            }
            if(row[0].email){
                let email = row[0].email
                mysqlConnection.query("UPDATE `user` SET is_email_verify=?,email_verification_token=? WHERE email=?",[1,null,email],(err,row,fields)=>{
                   
                        console.log('err',err)
                        console.log('row',row)
                        if(err){
                            throw new Error(err)
                        }
                        return res.render('user/waiting')
                    
                    // console.log('err',err)
                    // console.log('row',row)
                    // if(err){
                    //     res.end(err.message)
                    // }
                    // return res.render('user/waiting')
                })
            }
            else{
                res.end('invalid token')
            }
            
        } catch (e) {
            res.end(e.message)
        }
        // console.log('err',err)
        // console.log('row',row)
        // if(!row[0]){
        //     return res.end('invalid token')
        // }
        // if(row[0].email){
        //     let email = row[0].email
        //     mysqlConnection.query("UPDATE `user` SET is_email_verify=?,email_verification_token=? WHERE email=?",[1,null,email],(err,row,fields)=>{
        //         console.log('err',err)
        //         console.log('row',row)
        //         if(err){
        //             res.end(err.message)
        //         }
        //         // mysqlConnection.query("UPDATE `user` SET email_verification_token=? WHERE email=?",[null,email],(err,row,fields)=>{
        //         //     console.log('err',err)
        //         //     console.log('row',row)
        //         //     if(err){
        //         //         res.end(err.message)
        //         //     }
        //         // })
        //         return res.render('user/waiting')
        //     })
        // }
        // else{
        //     res.end('invalid token')
        // }
    })
    
})
router.get('/forgotPassword',ifUserLoggedIn,(req,res,next)=>{
    let message=""
    if(req.session.message){
        message=req.session.message
    }
    res.render('user/forgotPassword',{
        message
    })
})
router.post('/forgotPassword',(req,res,next)=>{
    if(!req.body.email){
        req.session.message = getMessage().setType('danger').setText('no email received')
        return res.redirect('/user/forgotPassword')
    }
    let forgot_password_token =  bcrypt.hashSync(req.body.email,8) 
    mysqlConnection.query("SELECT * FROM user WHERE email= '"+req.body.email+"'",(err,row,fields)=>{
        try {
            if(err){
                throw new Error(err)
            }
            if(!row[0]){
                throw new Error('invalid email')
                req.session.message = getMessage().setType('danger').setText('invalid email')
                return res.redirect('../user/forgotPassword')
            }
            req.body = row[0]
            mysqlConnection.query("UPDATE `user` SET `forgot_password_token`=? WHERE email=?",[forgot_password_token,req.body.email],(err,row,fields)=>{
                console.log('err',err)
                console.log('row',row)
                req.body.forgot_password_token = forgot_password_token  
                next()
            })
        } catch (e) {
            req.session.message = getMessage().setType('danger').setText(e.message)
            return res.redirect('../user/forgotPassword')
        }
        // if(!row[0]){
        //     req.session.message = getMessage().setType('danger').setText('invalid email')
        //     return res.redirect('../user/forgotPassword')
        // }
        // req.body = row[0]
        // mysqlConnection.query("UPDATE `user` SET `forgot_password_token`=? WHERE email=?",[forgot_password_token,req.body.email],(err,row,fields)=>{
        //     console.log('err',err)
        //     console.log('row',row)
        //     req.body.forgot_password_token = forgot_password_token  
        //     next()
        // })
    
    })

},forgotpass)
router.get('/resetPassword',ifUserLoggedIn,(req,res,next)=>{
    let message=""
    if(req.session.message){
        message = req.session.message
    }
    res.render('user/resetPassword',{
        token:req.query.token?req.query.token:'',
        message
    })
})
router.get('/changePassword',(req,res,next)=>{
    let message = ''
    console.log(req.session.user)
    if(req.session.message){
        message = req.session.message
    }
    res.render('user/changePassword',{
        message
    })

})
router.post('/resetPassword',(req,res,next)=>{
    console.log(req.body.token)
    if(!req.body.token){
        if(!req.session.user){
            req.session.message = getMessage().setType('danger').setText('Session expired please login again')
            return res.redirect('/user/login')
        }
        console.log('id',req.session.user.id)
        console.log('body',req.body)
        mysqlConnection.query("SELECT * FROM user WHERE id="+req.session.user.id,(err,row,fields)=>{
            try{
                if(err){
                    throw new Error(err)
                }
                if(!row[0]){
                    throw new Error('Invalid request')
                }
                if(!req.body.currentpassword){
                    throw new Error('Please provide current password')
                }
                console.log('row',row)
                console.log(bcrypt.compareSync(req.body.currentpassword,row[0].password))
                if(!bcrypt.compareSync(req.body.currentpassword,row[0].password)){
                    throw new Error('Incorrect Password')
                }
                req.body.password = bcrypt.hashSync(req.body.password,8)
                mysqlConnection.query("UPDATE `user` SET password=?,forgot_password_token=? WHERE email=?",[req.body.password,'',req.session.user.email],(err,row,fields)=>{
                    try {
                        console.log('err',err)
                        console.log('row',row)
                        if(err){
                            throw new Error(err)
                        }
                        req.session.message=getMessage().setType('success').setText('password reset successfully') 
                        return res.redirect('/')
                    } catch (e) {
                        return new Error(e)
                        console.log('error',e)

                            req.session.message = getMessage().setType('danger').setText(e.message)
                            return res.redirect('/user/changePassword')
                    }
                }) 

            }catch(e){


                    req.session.message = getMessage().setType('danger').setText(e.message)
                    return res.redirect('/user/changePassword')
                 
                
            }
        })
        // req.body.password = bcrypt.hashSync(req.body.password,8)
        // mysqlConnection.query("UPDATE `user` SET password=?,forgot_password_token=? WHERE email=?",[req.body.password,'',req.session.user.email],(err,row,fields)=>{
        //     try {
        //         console.log('err',err)
        //         console.log('row',row)
        //         if(err){
        //             throw new Error(err)
        //         }
        //         req.session.message=getMessage().setType('success').setText('password reset successfully') 
        //         return res.redirect('/')
        //     } catch (e) {
        //         console.log('error',e)
        //         if(e){

        //             req.session.message = getMessage().setType('danger').setText(e.message)
        //             return res.redirect('/user/changePassword')
        //         }
        //     }
        //     // console.log('err',err)
        //     // console.log('row',row)
        //     // // if(err){
        //     // //     res.end(err.message)
        //     // // }
        //     // req.session.message=getMessage().setType('success').setText('password reset successfully')
            
        //     // return res.redirect('/')
        // }) 
    }else{

        if(req.body.confirmpassword != req.body.password){
            req.session.message = getMessage().setType('danger').setText('passwords does not match')
            return res.redirect('/user/resetPassword')
        }
        delete req.body.confirmpassword
        let token = req.body.token
        req.body.password = bcrypt.hashSync(req.body.password,8)
        mysqlConnection.query("SELECT * FROM user WHERE forgot_password_token= '"+req.body.token+"'",(err,row,fields)=>{
            try {
                if(err){
                    throw new Error(err.message)
                }
                if(!row[0]){
                    throw new Error('Invalid token')
                }
                let email = row[0].email
                mysqlConnection.query("UPDATE `user` SET password=?,forgot_password_token=? WHERE email=?",[req.body.password,'',email],(err,row,fields)=>{
                    try {
                        console.log('err',err)
                        console.log('row',row)
                        if(err){
                            throw new Error(err)
                        }
                        req.session.message=getMessage().setType('success').setText('password reset successful, login with your new passwords')
                        return res.redirect('/user/login')
                    } catch (e) {
                        req.session.message=getMessage().setType('danger').setText(e.message)
                        return res.redirect('/user/login')
                    }
                    // console.log('err',err)
                    // console.log('row',row)
                    // if(err){
                    //     return res.end(err.message)
                    // }
                    // req.session.message=getMessage().setType('success').setText('password reset successful, login with your new passwords')
                    // return res.redirect('/user/login')
                })
            } catch (e) {
                req.session.message=getMessage().setType('danger').setText(e.message)
                return res.redirect('/user/login')
            }
            // if(err){
            //     req.session.message=getMessage().setType('danger').setText(err.message)
            //     return res.redirect('/user/login')
            // }
            // if(!row[0]){
            //     req.session.message=getMessage().setType('danger').setText('invalid token')
            //     return res.redirect('/user/login')
            // }
            // let email = row[0].email
            // mysqlConnection.query("UPDATE `user` SET password=?,forgot_password_token=? WHERE email=?",[req.body.password,'',email],(err,row,fields)=>{
            //     console.log('err',err)
            //     console.log('row',row)
            //     if(err){
            //         return res.end(err.message)
            //     }
            //     req.session.message=getMessage().setType('success').setText('password reset successful, login with your new passwords')
            //     return res.redirect('/user/login')
            // }) 
        })

    }
    
    
})
router.get('/profile/:id',(req,res,next)=>{
    console.log('hello')
    let message = ''
    if(!req.params.id){
        return res.redirect('/')
    }
    mysqlConnection.query("SELECT * FROM user WHERE id= "+req.params.id,(err,row,fields)=>{
        try {
            if(err){
                throw new Error(err)
            }
            if(!row[0]){
                throw new Error('Invalid request')
            }
            let user = row[0]
            console.log(user)
            res.render('user/userProfile',{
                user,
                message
            })
        } catch (e) {
            req.session.message=getMessage().setType('danger').setText(e.message)

            return res.redirect('/')
        }
        // if(err){
        //     next(err)
        // }
        // if(!row[0]){
        //     req.session.message=getMessage().setType('danger').setText('invalid request')

        //     return res.redirect('/')
        // }
        // let user = row[0]
        // console.log(user)
        // res.render('user/userProfile',{
        //     user,
        //     message
        // })
    })
})
router.post('/profile/:id',userImageUpload.single("image"),(req,res,next)=>{


    try {
        if(!req.params.id){
            throw new Error('invalid request')
            req.session.message=getMessage().setType('danger').setText('invalid request')
             return res.redirect('/')
        }
        req.body.id = req.params.id
        if(!req.file.filename){
            throw new Error('Provide file input')
            req.session.message=getMessage().setType('danger').setText('provide file input')
             return res.redirect('/')
        }
        console.log(validateEmail(req.body.email))
        if(validateEmail(req.body.email)){
            console.log(1)
            throw new Error('Email already exits')
        }
        req.body.image = req.file.filename
        console.log(req.body)
        mysqlConnection.query(`UPDATE user SET username=?,email=?,image=? WHERE id=?`,[req.body.username,req.body.email,req.body.image,Number(req.body.id)],(err,row,fields)=>{
            try {

                if(err){
                    throw new Error(err)
                }
               req.session.message=getMessage().setType('success').setText('profile edited successfully')
               mysqlConnection.query("SELECT * FROM user WHERE id="+req.body.id,(err,row,fields)=>{
                   // if(err){
                   //     next(err)
                   // }
                   try {
                        console.log('err',err)
                        if(err){
                            throw new Error(err)
                        }
                        if(!row[0]){
                            throw new Error('user not found')
                        }
                        let user = row[0]
                        console.log(user)
                        req.session.user = row[0]
                        if(req.cookies.user){
            
                            let newCookie = JSON.parse(req.cookies.user)
                            newCookie.email = row[0].email
                            res.cookie("user",JSON.stringify(newCookie), {expire: 400000 + Date.now()});
                        }
                        
                        return res.redirect('/')
                   } catch (e) {
                        req.session.message=getMessage().setType('danger').setText(e.message)
                        return res.redirect('/')
                   }
                //    console.log('err',err)
                //    if(!row[0]){
                //        req.session.message=getMessage().setType('danger').setText('user not found')
                //        return res.redirect('/')
                //    }
                //    let user = row[0]
                //    console.log(user)
                //    req.session.user = row[0]
                //    if(req.cookies.user){
       
                //        let newCookie = JSON.parse(req.cookies.user)
                //        newCookie.email = row[0].email
                //        res.cookie("user",JSON.stringify(newCookie), {expire: 400000 + Date.now()});
                //    }
                   
                //   return res.redirect('/')
               })
                
            } catch (e) {
                req.session.message=getMessage().setType('danger').setText(e.message)
                return res.redirect('/')
            }
            // if(err){
            //      next(err)
            // }
            // req.session.message=getMessage().setType('success').setText('profile edited successfully')
            // mysqlConnection.query("SELECT * FROM user WHERE id="+req.body.id,(err,row,fields)=>{
            //     // if(err){
            //     //     next(err)
            //     // }
            //     console.log('err',err)
            //     if(!row[0]){
            //         req.session.message=getMessage().setType('danger').setText('user not found')
            //         return res.redirect('/')
            //     }
            //     let user = row[0]
            //     console.log(user)
            //     req.session.user = row[0]
            //     if(req.cookies.user){
    
            //         let newCookie = JSON.parse(req.cookies.user)
            //         newCookie.email = row[0].email
            //         res.cookie("user",JSON.stringify(newCookie), {expire: 400000 + Date.now()});
            //     }
                
            //    return res.redirect('/')
            // })
        })
    } catch (e) {
        req.session.message=getMessage().setType('danger').setText(e.message)
        return res.redirect('/')
    }

    // if(!req.params.id){
    //     req.session.message=getMessage().setType('danger').setText('invalid request')
    //      return res.redirect('/')
    // }
    // req.body.id = req.params.id
    // if(!req.file.filename){
    //     req.session.message=getMessage().setType('danger').setText('provide file input')
    //      return res.redirect('/')
    // }
    // req.body.image = req.file.filename
    // console.log(req.body)
    // mysqlConnection.query(`UPDATE user SET username=?,email=?,image=? WHERE id=?`,[req.body.username,req.body.email,req.body.image,Number(req.body.id)],(err,row,fields)=>{
    //     if(err){
    //          next(err)
    //     }
    //     req.session.message=getMessage().setType('success').setText('profile edited successfully')
    //     mysqlConnection.query("SELECT * FROM user WHERE id="+req.body.id,(err,row,fields)=>{
    //         // if(err){
    //         //     next(err)
    //         // }
    //         console.log('err',err)
    //         if(!row[0]){
    //             req.session.message=getMessage().setType('danger').setText('user not found')
    //             return res.redirect('/')
    //         }
    //         let user = row[0]
    //         console.log(user)
    //         req.session.user = row[0]
    //         if(req.cookies.user){

    //             let newCookie = JSON.parse(req.cookies.user)
    //             newCookie.email = row[0].email
    //             res.cookie("user",JSON.stringify(newCookie), {expire: 400000 + Date.now()});
    //         }
            
    //        return res.redirect('/')
    //     })
    // })
})
module.exports = router