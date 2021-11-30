import { Sequelize } from "sequelize";
export function setUpSequelize(): any {
    // const sequelize = new Sequelize(databaseUrl, { logging: false });
  
    const sequelize = new Sequelize('javascript','root','', {
      host: "localhost",
      dialect: 'mysql',
    });
  
    return sequelize;
  }