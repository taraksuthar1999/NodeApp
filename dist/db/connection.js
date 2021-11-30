"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpSequelize = void 0;
const sequelize_1 = require("sequelize");
function setUpSequelize() {
    // const sequelize = new Sequelize(databaseUrl, { logging: false });
    const sequelize = new sequelize_1.Sequelize('javascript', 'root', '', {
        host: "localhost",
        dialect: 'mysql',
    });
    return sequelize;
}
exports.setUpSequelize = setUpSequelize;
//# sourceMappingURL=connection.js.map