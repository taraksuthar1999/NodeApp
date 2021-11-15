"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./db/connection");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const sequelize = connection_1.setUpSequelize();
sequelize
    .authenticate()
    .then(() => {
    console.log('DB Connection has been established successfully.');
    app.listen(8080, () => {
        console.log(`🌏🌏🌏🌏  Express server started at http://localhost:8080}   🌏🌏🌏🌏`);
    });
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
//# sourceMappingURL=app.js.map