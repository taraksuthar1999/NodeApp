"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const router = express_1.Router();
exports.product = () => router.use([
    controller_1.list()
]);
//# sourceMappingURL=routes.js.map