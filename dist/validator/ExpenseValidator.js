"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpenseValidator = (function () {
    function ExpenseValidator(data) {
        this.data = data;
        this.errors = {};
    }
    ExpenseValidator.prototype.validNew = function () {
        this.amountRequired();
        this.dateRequired();
        this.categoryValid();
        return Object.keys(this.errors).length == 0;
    };
    ExpenseValidator.prototype.validEdit = function () {
        this.amountRequired();
        this.dateRequired();
        this.categoryValid();
        return Object.keys(this.errors).length == 0;
    };
    ExpenseValidator.prototype.amountRequired = function () {
        if (!this.data.amount || isNaN(this.data.amount)) {
            this.errors.amount = "required";
        }
    };
    ExpenseValidator.prototype.dateRequired = function () {
        if (!this.data.date) {
            this.errors.date = "required";
        }
    };
    ExpenseValidator.prototype.categoryValid = function () {
        if (this.data.category == "null") {
            this.data.category = null;
        }
    };
    return ExpenseValidator;
}());
exports.default = ExpenseValidator;
