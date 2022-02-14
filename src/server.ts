import app from './app'
import { setUpSequelize } from './db/connection'
import logger from './logger';
const sequelize = setUpSequelize();
sequelize.authenticate().then(()=>{
  logger.info('DB Connection has been established successfully.');
  app.listen(process.env.PORT, (): void => {
    logger.info(`🌏🌏🌏🌏  Express server started at http://localhost:${process.env.PORT}  🌏🌏🌏🌏`);
  });
}).catch((err:Error)=>{
  console.error('Unable to connect to the database:', err);
})


