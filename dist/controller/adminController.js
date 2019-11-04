"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdminController = (function () {
    function AdminController() {
    }
    AdminController.prototype.getIndex = function (req, res, next) {
        res.render("admin/index");
    };
    return AdminController;
}());
var adminController = new AdminController();
exports.default = adminController;
