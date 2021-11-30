import express,{Request,Response,NextFunction} from 'express'
import bodyparser from 'body-parser'
import session from 'express-session'
import path from 'path'
import cookie from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
const app = express()
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true
}))


