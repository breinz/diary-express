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
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserModel_1 = __importDefault(require("../model/UserModel"));
var UserValidator_1 = __importDefault(require("../validator/UserValidator"));
var UserMiddleware = (function () {
    function UserMiddleware() {
    }
    UserMiddleware.prototype.getCurrentUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var cookie, id, user, error_1, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.cookies && req.cookies.session)) return [3, 6];
                        cookie = req.cookies.session;
                        id = cookie.substr(0, cookie.indexOf('%'));
                        user = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, UserModel_1.default.findById(id)];
                    case 2:
                        user = (_a.sent());
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2, next()];
                    case 4:
                        if (!user || !user.session) {
                            return [2, next()];
                        }
                        session = cookie.substr(cookie.indexOf('%') + 1);
                        return [4, bcrypt_1.default.compare(session, user.session)];
                    case 5:
                        if (!(_a.sent())) {
                            return [2, next()];
                        }
                        res.locals.current_user = user;
                        req.current_user = user;
                        _a.label = 6;
                    case 6:
                        next();
                        return [2];
                }
            });
        });
    };
    UserMiddleware.prototype.adminShield = function (req, res, next) {
        if (!req.current_user) {
            req.flash("error", req.t("user.error.login_required"));
            return res.redirect("/login");
        }
        if (!req.current_user || !req.current_user.admin) {
            req.flash("error", req.t("user.error.admin_required"));
            return res.redirect("/");
        }
        next();
    };
    UserMiddleware.prototype.loginShield = function (req, res, next) {
        if (!req.current_user) {
            req.flash("error", req.t("user.error.login_required"));
            return res.redirect("/login");
        }
        next();
    };
    UserMiddleware.prototype.validSignin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new UserValidator_1.default(req.body);
                        return [4, validator.validSignin()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2, res.render("signin/index", {
                                    data: req.body,
                                    errors: validator.errors
                                })];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    UserMiddleware.prototype.apiValidSignin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new UserValidator_1.default(req.body);
                        return [4, validator.validSignin()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2, res.status(400).json({ errors: validator.errors })];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    UserMiddleware.prototype.validLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new UserValidator_1.default(req.body);
                        if (!validator.validLogin()) {
                            return [2, res.render("login/login", {
                                    user: req.body,
                                    errors: validator.errors
                                })];
                        }
                        return [4, UserModel_1.default.findOne({ email: req.body.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2, res.render("login/login", {
                                    user: req.body,
                                    errors: {
                                        email: "not_found"
                                    }
                                })];
                        }
                        return [4, user.validatePassword(req.body.password)];
                    case 2:
                        if (!(_a.sent())) {
                            return [2, res.render("login/login", {
                                    user: req.body,
                                    errors: {
                                        password: "unvalid"
                                    }
                                })];
                        }
                        req.user = user;
                        next();
                        return [2];
                }
            });
        });
    };
    UserMiddleware.prototype.apiValidLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var validator, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validator = new UserValidator_1.default(req.body);
                        if (!validator.validLogin()) {
                            return [2, res.status(400).json({ error: true })];
                        }
                        return [4, UserModel_1.default.findOne({ email: req.body.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2, res.status(400).json({ error: true })];
                        }
                        return [4, user.validatePassword(req.body.password)];
                    case 2:
                        if (!(_a.sent())) {
                            return [2, res.status(400).json({ error: true })];
                        }
                        req.user = user;
                        next();
                        return [2];
                }
            });
        });
    };
    UserMiddleware.prototype.apiLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    UserMiddleware.prototype.apiFindUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ok, _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ok = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = req;
                        return [4, UserModel_1.default.findById(req.query.uid)];
                    case 2:
                        _a.current_user = (_b.sent());
                        return [3, 4];
                    case 3:
                        error_2 = _b.sent();
                        ok = false;
                        return [3, 4];
                    case 4:
                        if (!ok || !req.current_user) {
                            return [2, res.status(401).json({ error: "INVALID_USER" })];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    UserMiddleware.prototype.tokenShield = function (req, res, next) {
        if (req.current_user.api.expireAt < new Date()) {
            return res.status(401).json({ error: "OUTDATED_TOKEN" });
        }
        if (!req.query.token || req.query.token !== req.current_user.api.token) {
            return res.status(401).json({ error: "INVALID_TOKEN" });
        }
        next();
    };
    return UserMiddleware;
}());
exports.default = new UserMiddleware();
