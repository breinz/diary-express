"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StepMiddleware = (function () {
    function StepMiddleware() {
    }
    StepMiddleware.prototype.saveStep = function (req, res, next) {
        if (req.body.step) {
            res.cookie("step_" + req.body.stepName, {
                referer: req.headers.referer,
                data: req.body
            });
            return res.redirect(req.body.step);
        }
        next();
    };
    return StepMiddleware;
}());
var stepMiddleware = new StepMiddleware();
exports.default = stepMiddleware;
