const {Router} = require('express')
const mysqlConnection = require("../db/mysql")
const bodyParser = require('body-parser')
const router = Router()
const {userlogin} = require('../middleware/user')
const {imageUpload} = require("../fileupload/upload")
// const middleware = require("../middleware/auth")
const middleware = require("../middleware/schemas")
const JSONTransport = require('nodemailer/lib/json-transport')
function setMessage(message){
        this.message = message
        return this;
    }
function getMessage(){
        if(!this.message){
            return false
        }
        return this.message
}
router.use(bodyParser.json())
router.get('/',userlogin,(req,res,next)=>{
    if(!req.query.search){
        res.redirect('/1')
    }
    let message = ''
    let products = null
    let where = '1'
    let searchvar = ''
    
        // let page = 1;
        // if(req.query.page){
            //     page = Number(req.query.page)
            // }
            if(req.session.products){
                products = req.session.products
                req.session.products=null
            }
            if(req.session.message){
                message = req.session.message
                req.session.message=null
            }
            where = "id = '"+req.query.search+"' OR name like '%"+req.query.search+"%' OR price like '%"+req.query.search+"%' OR  discount like '%"+req.query.search+"%' OR quantity like '%"+req.query.search+"%'";  
            searchvar = req.query.search
        // let offset = (page)=>{
        //     return (page-1)*5
        // }
        mysqlConnection.query(`SELECT * FROM product WHERE ${where}`,(err,row,fields)=>{
            
            console.log('row',row)
            console.log('error',err)
            if(err){

                next(err)
            }
            res.render("product/home",{
                products:row,
                message,
                pages:'',
                searchvar:searchvar,
                title:"product",
                user:req.session.user
            })
        })
})
router.get("/:page",userlogin,(req,res,next)=>{
    const Pagination = require('../middleware/pagination')
    const page_id = parseInt(req.params.page)
    let sort = ''
    let order = 'DESC'
    const currentPage = page_id > 0 ? page_id : 1
    let message=''
    pageUri = '/';
    if(req.session.message){
        message = req.session.message
        req.session.message=null
    }
    if(req.query.order){
        order = req.query.order
    }
    if(req.query.sort){
        sort = "ORDER BY "+req.query.sort+order
    }
    console.log(req.session.user)
    mysqlConnection.query(`SELECT COUNT(id) as totalCount FROM product`,(err,row,fields)=>{
        const perPage = 3,totalCount = row[0].totalCount;
        const Paginate = new Pagination(totalCount,currentPage,pageUri,perPage);
        if(Paginate.currentPage > Paginate.totalCount){
            res.end('invalid page req')
        }
        // if(err){
        //     next(err)
        // }
        mysqlConnection.query("SELECT * FROM product "+sort+" LIMIT "+Paginate.perPage+' OFFSET '+Paginate.offset,(err,row,fields)=>{
            // if(err){
            //     next(err)
            // }
            res.render("product/home",{
                products:row,
                pages:Paginate.links(),
                message,
                searchvar:'',
                title:"product",
                user:req.session.user
            })
        })
    }) 


})
router.get("/add/:id",userlogin,(req,res,next)=>{
        let message = null
        if(req.session.message){
            message = req.session.message
            req.session.message=null
        }
        if(req.params.id > 0){
            mysqlConnection.query(`SELECT * FROM product WHERE id=${req.params.id}`,(err,row,fields)=>{
                if(err){
                    next(err)
                }
                res.render("product/form",{
                    product:row,
                    message:message,
                    title:"product",
                    user:req.session.user
                })
            }) 
        }else{
            res.render('product/form',{
                product:[{id:0}],
                message:message,
                title:'product',
                user:req.session.user
            })
        }

}) 
router.post("/save/:id",imageUpload.single("image"),middleware
,(req,res,next)=>{
        req.body.image = req.file.filename
        if(req.params.id == 0){
            mysqlConnection.query(`INSERT INTO product SET?`,req.body,(err,row,fields)=>{
                if(err){
                    next(err)
                }
                res.redirect('/')
            })
        }else{
            
            mysqlConnection.query(`UPDATE product SET name=?,price=?,discount=?,quantity=?,discription=?, image=? WHERE id=?`,[req.body.name,Number(req.body.price),Number(req.body.discount),Number(req.body.quantity),req.body.discription,req.file.filename,req.params.id],(err,row,fields)=>{
                if(err){
                     next(err)
                }
                res.redirect('/')
            })
        }
})
router.get("/delete/:id",userlogin,(req,res,next)=>{
        if(req.params.id<0){
            next(new Error("Unable to Delete"))
        }
        mysqlConnection.query(`DELETE FROM product WHERE id=${req.params.id}`,(err,row,fields)=>{
            if(err){
                next(err)
            }
            res.redirect('/')
        })

}) 
router.get('/changeStatus/:id',userlogin,(req,res,next)=>{
    if(!req.params.id){
        next("invalid request")
    }
    if(req.query.status==0){
        mysqlConnection.query(`UPDATE product SET status= ? WHERE id=?`,[1,req.params.id],(err,row,fields)=>{
            if(err){
                next(err)
            }
            res.redirect('/')
        })
    }else{
        mysqlConnection.query(`UPDATE product SET status= ? WHERE id=?`,[0,req.params.id],(err,row,fields)=>{
            if(err){
                next(err)
            }
            res.redirect('/')
        })
    }
})
router.get('/view/:id',userlogin,(req,res,next)=>{
    if(!req.params.id){
        next()
    }
    mysqlConnection.query(`SELECT * FROM product WHERE id=${req.params.id}`,(err,row,fields)=>{
        if(err){
            next(err)
        }
        res.render("product/view",{
            product:row,
        })
    })
})
module.exports = router