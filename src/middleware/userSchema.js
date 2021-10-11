const Joi = require('@hapi/joi') 
// const Joi = baseJoi.extend(ImageExtension)
const userRegister = Joi.object({ 
    username: Joi.string().min(3).required() ,
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
    password: Joi.string().min(6).required(), 
    confirmpassword: Joi.string().min(6).required()
  }); 

const userlogin = Joi.object({ 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
    password: Joi.string().min(6).required(),
    set_user_cookie:Joi.string() 
}); 
module.exports.userRegistrationValidation = async(req, res, next) => { 
  try{
    
    await userRegister.validateAsync(req.body); 
    next()
  }catch(e){
  
    next(e) 
  } 
}
module.exports.userLoginValidation = async(req, res, next) => { 
    try{
      console.log('reqbody',req.body)
      await userlogin.validateAsync(req.body); 
      next()
    }catch(e){
    console.log('err',e)
      next(e) 
    } 
  } 