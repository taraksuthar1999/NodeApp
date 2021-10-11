const Joi = require('@hapi/joi') 
// const Joi = baseJoi.extend(ImageExtension)
const product = Joi.object({ 
    name: Joi.string().min(3).required() ,
    price: Joi.number().required(), 
    discount: Joi.number().required(), 
    quantity: Joi.number().required(), 
    discription: Joi.string().min(3).required(),
    image:Joi.string().max(500000)
  }); 
module.exports = async(req, res, next) => { 
  try{
    await product.validateAsync(req.body); 
    next()
  }catch(e){
    req.session.message=e.message
    res.redirect(`/add/${req.params.id}`)
    // next(e) 
  } 
}
  
  