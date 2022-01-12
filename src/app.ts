import app from './index'
import { setUpSequelize } from './db/connection'
const sequelize = setUpSequelize();
sequelize.authenticate().then(()=>{
  console.log('DB Connection has been established successfully.')
  app.listen(8080, (): void => {
    console.log(`🌏🌏🌏🌏  Express server started at http://localhost:8080}   🌏🌏🌏🌏`);
  });
}).catch((err:Error)=>{
  console.error('Unable to connect to the database:', err);
})


