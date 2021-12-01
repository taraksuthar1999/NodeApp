"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const connection_1 = require("./db/connection");
const sequelize = connection_1.setUpSequelize();
index_1.default.listen(8080, () => {
    console.log(`🌏🌏🌏🌏  Express server started at http://localhost:8080}   🌏🌏🌏🌏`);
});
//# sourceMappingURL=app.js.map