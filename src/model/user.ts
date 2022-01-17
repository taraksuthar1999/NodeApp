import {Model,DataTypes} from 'sequelize';
import {setUpSequelize} from '../db/connection';
import bcryptjs from 'bcryptjs'
const sequelizeInstance = setUpSequelize();
export class User extends Model{
    public id:bigint;
    public username: string;
    public email:string;    
    public password:string;
    public image?:string;
    public email_verification_token?: string;
    public forgot_password_token?:string;
    public is_email_verify?:number;
    public createdAt?: Date;
    public updatedAt?: Date;
}
User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      forgot_password_token: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      email_verification_token: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_email_verify:{
          type: DataTypes.INTEGER,
          allowNull:true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'user',
      timestamps: true,
      sequelize: sequelizeInstance,
    },
  );