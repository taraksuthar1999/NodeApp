"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./controllers/admin/routes"));
const router = express_1.Router();
router.use('/admin', routes_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map