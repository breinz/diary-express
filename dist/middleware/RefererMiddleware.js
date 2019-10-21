"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RefererMiddleware = (function () {
    function RefererMiddleware() {
    }
    RefererMiddleware.prototype.save = function (req, res, next) {
        res.cookie("referer", req.headers.referer);
        next();
    };
    RefererMiddleware.prototype.retrieve = function (req, res, next) {
        req.referer = req.cookies.referer;
        next();
    };
    RefererMiddleware.prototype.clear = function (req, res, next) {
        res.clearCookie("referer");
        next();
    };
    return RefererMiddleware;
}());
var refererMiddleware = new RefererMiddleware();
exports.default = refererMiddleware;
