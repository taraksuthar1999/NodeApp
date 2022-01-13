import app from './index'
import { setUpSequelize } from './db/connection'
import logger from './logger';
const sequelize = setUpSequelize();
sequelize.authenticate().then(()=>{
  logger.info('DB Connection has been established successfully.');
  app.listen(8080, (): void => {
    logger.info(`🌏🌏🌏🌏  Express server started at http://localhost:8080  🌏🌏🌏🌏`);
  });
}).catch((err:Error)=>{
  console.error('Unable to connect to the database:', err);
})


