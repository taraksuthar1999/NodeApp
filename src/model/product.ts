import {Model,DataTypes} from 'sequelize';
import {setUpSequelize} from '../db/connection';
import bcryptjs from 'bcryptjs'
const sequelizeInstance = setUpSequelize();
export class Product extends Model{
    public id:bigint;
    public name: string;
    public price:number;    
    public discount:number;
    public quantity:number;
    public discription:string;
    public image:string;
    public status:number;
}
Product.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
      },
    },
    {
      tableName: 'product',
      timestamps: false,
      sequelize: sequelizeInstance,
    },
  );