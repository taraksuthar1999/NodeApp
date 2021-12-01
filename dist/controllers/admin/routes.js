"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("./product/routes");
const router = express_1.Router();
router.use('/product', routes_1.product());
exports.default = router;
//# sourceMappingURL=routes.js.map