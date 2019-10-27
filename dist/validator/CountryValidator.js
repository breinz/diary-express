"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CountryValidator = (function () {
    function CountryValidator(data) {
        this.data = data;
        this.errors = {};
    }
    CountryValidator.prototype.validNew = function () {
        this.nameRequired();
        return Object.keys(this.errors).length == 0;
    };
    CountryValidator.prototype.validEdit = function () {
        this.nameRequired();
        return Object.keys(this.errors).length == 0;
    };
    CountryValidator.prototype.nameRequired = function () {
        if (!this.data.name || this.data.name.trim().length == 0) {
            this.errors.name = "required";
        }
    };
    return CountryValidator;
}());
exports.default = CountryValidator;
