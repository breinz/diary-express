"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiDiaryController = (function () {
    function ApiDiaryController() {
    }
    ApiDiaryController.prototype.getIndex = function (req, res, next) {
        res.json({
            expenses: req.expenses,
            people: req.peoples,
            events: req.events
        });
    };
    ApiDiaryController.prototype.getDay = function (req, res, next) {
        res.json({
            expenses: req.expenses,
            people: req.peoples,
            events: req.events
        });
    };
    return ApiDiaryController;
}());
var controller = new ApiDiaryController();
exports.default = controller;
