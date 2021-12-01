import { RequestHandler, Router } from 'express';
import handleError from '../../../middlewares/handle-error';
import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';
import { Sequelize, Op } from 'sequelize';
import { setUpSequelize } from '../../../db/connection';
import {Product} from '../../../model/product'
import * as _ from 'lodash';
const router = Router();
const validator = createValidator();
const connection: Sequelize = setUpSequelize();
//--------------------------------------------------------prodcut list--------------------------------------

export const getManageProductListHandler: RequestHandler = async (req, res) => {
    try {


        if(!req.query.search){
            res.redirect('/1')
        }
        const body = req.query
        const Where: any = {};
        _.set(
            Where,
            [Op.or],
            [
              Sequelize.where(Sequelize.col('Product.name'), { [Op.like]: `%${body.search}%` }),
              Sequelize.where(Sequelize.col('Product.price'), { [Op.like]: `%${body.search}%` }),
              Sequelize.where(Sequelize.col('`Product`.`discription`'), { [Op.like]: `%${body.search}%` })
            ],
          );
          const Products = await Product.findAll({where:Where,order: [['name', 'ASC']]})
          if(!Products){
              return res.end('no products found')
          }
        //return res.json(Products)
            return res.render("product/ej",{
                products:Products,
                message:'success',
                pages:'',
                //searchvar:searchvar,
                title:"product",
                //user:req.session.user
            })
    } catch (error) {
      return res.status(500).send({ success: 0, error: { message: error.message } });
    }
  };




export const list: any = () =>
  router.get('/list', handleError(getManageProductListHandler));