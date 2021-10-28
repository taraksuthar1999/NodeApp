import { setUpSequelize } from './db/connection';
import express from 'express'
const app = express();
const sequelize = setUpSequelize();
sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
    app.listen(app.get('port'), (): void => {
      console.log(`🌏🌏🌏🌏  Express server started at http://localhost:${app.get('port')}   🌏🌏🌏🌏`);
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });
