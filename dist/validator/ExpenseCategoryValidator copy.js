"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpenseCategoryValidator = (function () {
    function ExpenseCategoryValidator(data) {
        this.data = data;
        var form_data = this.data;
        this.data.report = this.data.report || {
            active: form_data["report.active"] == "on",
            times: parseInt(form_data["report.times"]) || 1,
            period: form_data["report.period"] || "day",
            per: form_data["report.per"]
        };
        this.errors = {};
    }
    ExpenseCategoryValidator.prototype.validNew = function () {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        this.reportValid();
        return Object.keys(this.errors).length == 0;
    };
    ExpenseCategoryValidator.prototype.validEdit = function () {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        this.reportValid();
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
    ExpenseCategoryValidator.prototype.reportValid = function () {
        if (!this.data.report.active)
            return;
        if (!this.data.report.per || this.data.report.per.trim().length == 0) {
            this.errors.report = "invalid";
        }
        if (this.data.report.times <= 0) {
            this.errors.report = "invalid";
        }
    };
    return ExpenseCategoryValidator;
}());
exports.default = ExpenseCategoryValidator;
