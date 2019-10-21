"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpenseCategoryValidator = (function () {
    function ExpenseCategoryValidator(data) {
        this.data = data;
        this.errors = {};
    }
    ExpenseCategoryValidator.prototype.validNew = function () {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        return Object.keys(this.errors).length == 0;
    };
    ExpenseCategoryValidator.prototype.validEdit = function () {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        return Object.keys(this.errors).length == 0;
    };
    ExpenseCategoryValidator.prototype.nameRequired = function () {
        if (!this.data.name || this.data.name.trim().length == 0) {
            this.errors.name = "required";
        }
    };
    ExpenseCategoryValidator.prototype.iconRequired = function () {
        if (!this.data.icon || this.data.icon.trim().length == 0) {
            this.errors.icon = "required";
        }
    };
    ExpenseCategoryValidator.prototype.colorRequired = function () {
        if (!this.data.color || this.data.color.trim().length == 0) {
            this.errors.color = "required";
        }
    };
    return ExpenseCategoryValidator;
}());
exports.default = ExpenseCategoryValidator;
