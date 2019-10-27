"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PeopleValidator = (function () {
    function PeopleValidator(data) {
        this.data = data;
        this.errors = {};
    }
    PeopleValidator.prototype.validNew = function () {
        this.firstNameRequired();
        this.metInRequired();
        return Object.keys(this.errors).length == 0;
    };
    PeopleValidator.prototype.validEdit = function () {
        this.firstNameRequired();
        this.metInRequired();
        return Object.keys(this.errors).length == 0;
    };
    PeopleValidator.prototype.firstNameRequired = function () {
        if (!this.data.firstName || this.data.firstName.trim().length == 0) {
            this.errors.firstName = "required";
        }
    };
    PeopleValidator.prototype.metInRequired = function () {
        if (!this.data.metIn || this.data.metIn.trim().length == 0) {
            this.errors.metIn = "required";
        }
    };
    return PeopleValidator;
}());
exports.default = PeopleValidator;
