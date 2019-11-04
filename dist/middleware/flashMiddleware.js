"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FlashMiddleware = (function () {
    function FlashMiddleware() {
    }
    FlashMiddleware.prototype.init = function (req, res, next) {
        req.flash = function (type, message) {
            if (req.session) {
                req.session.flash = req.session.flash || {};
                req.session.flash[type] = message;
            }
        };
        if (req.session && req.session.flash) {
            res.locals.flash = req.session.flash;
            res.locals.cache = false;
            delete req.session.flash;
        }
        next();
    };
    return FlashMiddleware;
}());
exports.default = new FlashMiddleware();
