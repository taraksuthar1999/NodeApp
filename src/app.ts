import app from './index'
import { setUpSequelize } from './db/connection'
const sequelize = setUpSequelize();

    app.listen(8080, (): void => {
      console.log(`🌏🌏🌏🌏  Express server started at http://localhost:8080}   🌏🌏🌏🌏`);
    });


