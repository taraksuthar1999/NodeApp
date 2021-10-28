import { Sequelize } from "sequelize";
export function setUpSequelize(): any {
    // const sequelize = new Sequelize(databaseUrl, { logging: false });
  
    const sequelize = new Sequelize(process.env.USERNAME, process.env.USER, process.env.PASSWORD, {
      host: "localhost",
      dialect: 'mysql',
    });
  
    return sequelize;
  }