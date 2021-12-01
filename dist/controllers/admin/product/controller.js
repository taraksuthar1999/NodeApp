"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.getManageProductListHandler = void 0;
const express_1 = require("express");
const handle_error_1 = __importDefault(require("../../../middlewares/handle-error"));
const express_joi_validation_1 = require("express-joi-validation");
const sequelize_1 = require("sequelize");
const connection_1 = require("../../../db/connection");
const product_1 = require("../../../model/product");
const _ = __importStar(require("lodash"));
const router = express_1.Router();
const validator = express_joi_validation_1.createValidator();
const connection = connection_1.setUpSequelize();
//--------------------------------------------------------prodcut list--------------------------------------
exports.getManageProductListHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.search) {
            res.redirect('/1');
        }
        const body = req.query;
        const Where = {};
        _.set(Where, [sequelize_1.Op.or], [
            sequelize_1.Sequelize.where(sequelize_1.Sequelize.col('Product.name'), { [sequelize_1.Op.like]: `%${body.search}%` }),
            sequelize_1.Sequelize.where(sequelize_1.Sequelize.col('Product.price'), { [sequelize_1.Op.like]: `%${body.search}%` }),
            sequelize_1.Sequelize.where(sequelize_1.Sequelize.col('`Product`.`discription`'), { [sequelize_1.Op.like]: `%${body.search}%` })
        ]);
        const Products = yield product_1.Product.findAll({ where: Where, order: [['name', 'ASC']] });
        if (!Products) {
            return res.end('no products found');
        }
        //return res.json(Products)
        return res.render("product/ej", {
            products: Products,
            message: 'success',
            pages: '',
            //searchvar:searchvar,
            title: "product",
        });
    }
    catch (error) {
        return res.status(500).send({ success: 0, error: { message: error.message } });
    }
});
exports.list = () => router.get('/list', handle_error_1.default(exports.getManageProductListHandler));
//# sourceMappingURL=controller.js.map