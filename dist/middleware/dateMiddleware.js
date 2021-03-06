"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateMiddleware = (function () {
    function DateMiddleware() {
    }
    DateMiddleware.prototype.getPeriod = function (req, res, next) {
        if (req.params.year) {
            var year = parseInt(req.params.year);
            if (req.params.month) {
                var month = parseInt(req.params.month);
                if (req.params.day) {
                    var day = parseInt(req.params.day);
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
    return DateMiddleware;
}());
var dateMiddleware = new DateMiddleware();
exports.default = dateMiddleware;
