"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PeopleController = (function () {
    function PeopleController() {
    }
    PeopleController.prototype.getIndex = function (req, res, next) {
        res.render("people/index");
    };
    PeopleController.prototype.getNew = function (req, res, next) {
        res.render("people/new");
    };
    return PeopleController;
}());
var peopleController = new PeopleController();
exports.default = peopleController;
