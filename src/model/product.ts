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
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      business_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      actor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dial_code: {
        type: DataTypes.STRING(5),
        allowNull: true,
        defaultValue: '+234',
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      street_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      state_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      local_govt_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      is_profile_completed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0',
      },
      email_verification_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      forgot_password_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dial_code_two: {
        type: DataTypes.STRING(5),
        allowNull: true,
        defaultValue: '+234',
      },
      phone_number_two: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      is_email_verified: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0',
      },
      is_phone_verified: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0',
      },
  
      is_password_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0',
      },
      joining_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0',
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0',
      },
      i_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      u_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      file: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      sequelize: sequelizeInstance,
      scopes: {
        withToken: {
          include: [
            {
              model: Tokens,
              as: 'token',
            },
          ],
        },
      },
    },
  );