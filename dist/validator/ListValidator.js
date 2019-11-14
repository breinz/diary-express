"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListValidator = (function () {
    function ListValidator(data) {
        this.data = data;
        this.errors = {};
    }
    ListValidator.prototype.validNew = function () {
        this.titleRequired();
        this.iconRequired();
        this.colorRequired();
        return Object.keys(this.errors).length == 0;
    };
    ListValidator.prototype.titleRequired = function () {
        if (!this.data.title || !this.data.title.trim().length) {
            this.errors.title = "required";
        }
    };
    ListValidator.prototype.iconRequired = function () {
        if (!this.data.icon || !this.data.icon.trim().length) {
            this.errors.icon = "required";
        }
    };
    ListValidator.prototype.colorRequired = function () {
        if (!this.data.color || !this.data.color.trim().length) {
            this.errors.color = "required";
        }
    };
    return ListValidator;
}());
exports.default = ListValidator;
