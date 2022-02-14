import express,{Request,Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import path from 'path'
import routes from './routes'
import cookie from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
// import { NotFoundError } from './errors/index';
import { ExpressJoiError } from 'express-joi-validation';
import  {ReE}  from './services/util.service';
import { User } from './model/user'
const app = express()

declare module 'express-session' {
  export interface SessionData {
    user: User;
    message:any;
  }
}
dotenv.config();
console.log(process.env.PORT)
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized: true
}))
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookie())
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../src/views'))
app.use('/', routes);
// app.use((req, res, next) => next(new NotFoundError()));
// app.use((err: any | ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log('Catch Error', err);
//     if (err.message) {
//       return ReE(res, err.message, err.status);
//     }
//     const e: ExpressJoiError = err;
//     return ReE(res, e, 400);
//   });
export default app
