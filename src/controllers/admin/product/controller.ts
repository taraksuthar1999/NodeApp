import { RequestHandler, Router } from 'express';
import handleError from '../../../middlewares/handle-error';
import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { Sequelize, Op } from 'sequelize';
import { setUpSequelize } from '../../../db/connection';
import {Product} from '../../../model/product'
import {Pagenation} from '../../../middlewares/pagination'
import { Page } from '../../../utils/constants';
import {message} from '../../../model/message'
import * as _ from 'lodash';
import { lutimes } from 'fs';
const router = Router();
const validator = createValidator();
const connection: Sequelize = setUpSequelize();

//--------------------------------------------------------prodcut list--------------------------------------

export const getManageProductListHandler: RequestHandler = async (req, res) => {
      try {
        const Where: any = {};
        const Data:any = {}
        let currentPage:number = 1
        const body = req.query
        if(body.search){
          _.set(
            Where,
            [Op.or],
            [
              Sequelize.where(Sequelize.col('Product.name'), { [Op.like]: `%${body.search}%` }),
              Sequelize.where(Sequelize.col('Product.price'), { [Op.like]: `%${body.search}%` }),
              Sequelize.where(Sequelize.col('`Product`.`discription`'), { [Op.like]: `%${body.search}%` })
            ],
          );   
        }
       
        if(body?.page){
          currentPage=Number(body.page)
        }
        console.log(body.page)
        let pageUri:string = `${body?.search?body.search:''}?page=`;
        const Products = await Product.findAndCountAll({where:Where,order: [['id', 'ASC']]})
        if(!Products){
          return res.end('no products found')
        }
        const Paginate = new Pagenation(Products.count,currentPage,pageUri,Page.perPage);
        console.log(Paginate.offset)
        const ProductData = await Product.findAndCountAll({where:Where,offset:Paginate.offset,limit:Paginate.perPage,order: [['id', 'ASC']]})

        Data.pages = Paginate.links()
        Data.products = ProductData.rows
        Data.message = null
        Data.title = 'product'
        Data.user = req.session.user
        Data.searchvar = ''
        //return res.json(Data)
        return res.render("product/home",{Data})
      } catch (error) {
        return res.status(500).send({ success: 0, error: { message: error.message } });
      }
};

//-------------------------------------add product-------------------------------------------
export const getProductFormHandler: RequestHandler = async (req, res) => {
  try {
    let message = null
        if(req.session.message){
            message = req.session.message
            req.session.message=null
        }
    return res.render('product/form',{
      product:[{id:0}],
      message:message,
      title:'product',
      user:req.session.user
  })
  } catch (error) {
    return res.status(500).send({ success: 0, error: { message: error.message } });
  }
};

export const getProductAddHandler: RequestHandler = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).send({ success: 0, error: { message: error.message } });
  }
};

export const list: any = () =>
  router.get('/list', handleError(getManageProductListHandler));
export const form: any = () =>
  router.get('/form', handleError(getProductFormHandler));
export const add: any = () =>
  router.post('/add', handleError(getProductAddHandler));

