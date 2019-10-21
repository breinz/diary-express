"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainController = (function () {
    function MainController() {
    }
    MainController.prototype.getIndex = function (req, res, next) {
        return res.render("index");
    };
    return MainController;
}());
var mainController = new MainController();
exports.default = mainController;
