"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const app = express_1.default();
app.use(express_session_1.default({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(cors_1.default());
app.use(compression_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.use('/', routes_1.default);
// app.use((req, res, next) => next(new NotFoundError()));
// app.use((err: any | ExpressJoiError, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log('Catch Error', err);
//     if (err.message) {
//       return ReE(res, err.message, err.status);
//     }
//     const e: ExpressJoiError = err;
//     return ReE(res, e, 400);
//   });
exports.default = app;
//# sourceMappingURL=index.js.map