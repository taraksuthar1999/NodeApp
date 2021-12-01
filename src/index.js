const app = require('express')()
const express = require('express')
const mysqlConnection = require("./db/mysql")
const bodyParser = require('body-parser')
const product = require('./routes/product')
const user = require('./routes/user')
const session = require('express-session')
const path = require('path')
const cookie = require('cookie-parser')
require('dotenv').config({ path: './config.env' })
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookie())
app.set('view engine','ejs')
app.set('views', path.join(__dirname, './views'))
app.get('/home',(req,res)=>{
    res.end('home')
})
app.use('/',product)
app.use('/user',user)
// app.use('/category',category)

app.listen(process.env.PORT,()=>{
    console.log('server started on '+process.env.PORT)
})
// app.use(function (err, req, res, next) {
//     res.session.message = 
//     // req.session.message = err.message
//     // res.status(200).redirect('/')
//     // res.status(400).send(err.message)
// })
// app.all('*', (req, res, next) => {
//     res.status(404).json({
//       status: 'fail',
//       message: `Can't find ${req.originalUrl} on this server!`
//     });
// });