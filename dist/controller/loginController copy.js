"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginController = (function () {
    function LoginController() {
    }
    LoginController.prototype.getIndex = function (req, res, next) {
        res.render("login/index");
        next();
    };
    return LoginController;
}());
var loginController = new LoginController();
exports.default = loginController;
