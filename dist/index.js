"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var reload = require("reload");
var http_1 = __importDefault(require("http"));
var config_1 = __importDefault(require("./config"));
var userMiddleware_1 = __importDefault(require("./middleware/userMiddleware"));
var flashMiddleware_1 = __importDefault(require("./middleware/flashMiddleware"));
var mainRouter_1 = __importDefault(require("./router/mainRouter"));
var T_1 = __importDefault(require("./T"));
var Util_1 = __importDefault(require("./helper/Util"));
var fs_1 = require("fs");
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: "blahpomblah",
    cookie: {
        maxAge: 1000 * 60
    },
    resave: true,
    saveUninitialized: true
}));
app.use(express_1.default.static("dist/assets"));
app.set("view engine", "pug");
app.disable("view cache");
app.set('views', path_1.default.join(__dirname, '../src/views'));
app.use(userMiddleware_1.default.getCurrentUser);
app.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var lang, t, util;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.current_user) {
                    lang = req.current_user.lang || "en";
                }
                else {
                    lang = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || process.env.LANGUAGE || "en";
                    lang = lang.substr(0, 2);
                }
                t = new T_1.default(lang);
                return [4, t.load()];
            case 1:
                _a.sent();
                res.locals.t = t.t.bind(t);
                res.locals.p = t.p.bind(t);
                req.t = t.t.bind(t);
                req.lang = lang;
                res.locals.current_lang = lang;
                util = new Util_1.default(t);
                req.util = util;
                res.locals.util = util;
                res.locals.cache = false;
                next();
                return [2];
        }
    });
}); });
app.use(flashMiddleware_1.default.init);
app.use(mainRouter_1.default);
var server = http_1.default.createServer(app);
server.listen(config_1.default.PORT, "0.0.0.0", function () {
    console.log("App running");
});
reload(app).then(function (reloadReturned) {
    fs_1.watch(__dirname + "/../src/views", { recursive: true }, function (e, f) {
        reloadReturned.reload();
    });
    fs_1.watch(__dirname + "/assets", { recursive: true }, function (e, f) {
        reloadReturned.reload();
    });
    fs_1.watch(__dirname + "/lang", function (e, f) {
        reloadReturned.reload();
    });
});
exports.default = app;
