"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../db/connection");
const sequelizeInstance = connection_1.setUpSequelize();
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    discription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
    },
}, {
    tableName: 'product',
    timestamps: false,
    sequelize: sequelizeInstance,
});
//# sourceMappingURL=product.js.map