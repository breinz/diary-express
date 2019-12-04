"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiDateMiddleware = (function () {
    function ApiDateMiddleware() {
    }
    ApiDateMiddleware.prototype.getPeriod = function (req, res, next) {
        if (req.query.year) {
            var year = parseInt(req.query.year);
            if (req.query.month) {
                var month = parseInt(req.query.month);
                if (req.query.day) {
                    var day = parseInt(req.query.day);
                    req.bop = new Date(year, month - 1, day);
                    req.eop = new Date(year, month - 1, day + 1);
                }
                else {
                    req.bop = new Date(year, month - 1, 1);
                    req.eop = new Date(year, month, 1);
                }
            }
            else {
                req.bop = new Date(year, 0, 1);
                req.eop = new Date(year + 1, 0, 1);
            }
        }
        else {
            req.bop = req.util.bom();
            req.eop = req.util.bonm();
        }
        req.bop.setMinutes(req.bop.getMinutes() - req.bop.getTimezoneOffset());
        req.eop.setMinutes(req.eop.getMinutes() - req.eop.getTimezoneOffset());
        next();
    };
    return ApiDateMiddleware;
}());
var middleware = new ApiDateMiddleware();
exports.default = middleware;
