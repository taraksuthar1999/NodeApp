import { RequestHandler, Router } from 'express';
import handleError from '../../../middlewares/handle-error';
import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { Sequelize, Op } from 'sequelize';
import { setUpSequelize } from '../../../db/connection';
import {message} from '../../../model/message'
import * as _ from 'lodash';
import { lutimes } from 'fs';
const router = Router();
const validator = createValidator();
const connection: Sequelize = setUpSequelize();


export const getLoginFormHandler: RequestHandler = async (req, res) => {
    try {
        let user = null
        let msg= null
        if(req.cookies.user){
            user = JSON.parse(req.cookies.user)
        }
        if(req.session.message){
            msg=req.session.message
            req.session.message = new message()
        }
        return res.render('user/login',{
            message:msg,
            user
        })
    } catch (error) {
        let msg = new message(error.message)
        return res.render('user/login',{
            message:msg,
            user:null
        })
    }
  };

  export const getRegisterFormHandler: RequestHandler = async (req, res) => {
    try {
        let msg=null
        if(req.session.user){
            return res.redirect('admin/user/login')
        }
        if(req.session.message){
            msg = req.session.message
            req.session.message = new message()
        }
        res.render('user/register',{
            message:msg
        })
    } catch (error) {
        let msg = new message(error.message)
        return res.render('user/register',{
            message:msg
        })
    }
  };



  export const loginForm: any = () =>
  router.get('/login', handleError(getLoginFormHandler));

  export const registerForm: any = () =>
  router.get('/register', handleError(getRegisterFormHandler));