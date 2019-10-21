"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator_1 = __importDefault(require("../validator/UserValidator"));
var SigninMiddleware = (function () {
    function SigninMiddleware() {
    }
    SigninMiddleware.prototype.valid = function (req, res, next) {
        var validator = new UserValidator_1.default(req.body);
        if (!validator.validSignin()) {
            return res.render("signin/index", {
                data: req.body,
                errors: validator.errors
            });
        }
        next();
    };
    return SigninMiddleware;
}());
var signinMiddleware = new SigninMiddleware();
exports.default = signinMiddleware;
