"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageValidator = (function () {
    function PageValidator(data) {
        this.data = data;
        this.errors = {};
    }
    PageValidator.prototype.validNew = function () {
        this.titleRequired();
        this.urlRequired();
        this.idRequired();
        return Object.keys(this.errors).length == 0;
    };
    PageValidator.prototype.validEdit = function () {
        this.titleRequired();
        this.urlRequired();
        this.idRequired();
        return Object.keys(this.errors).length == 0;
    };
    PageValidator.prototype.titleRequired = function () {
        if (!this.data.title || this.data.title.trim().length == 0) {
            this.errors.title = "required";
        }
    };
    PageValidator.prototype.urlRequired = function () {
        if (!this.data.url || this.data.url.trim().length == 0) {
            this.errors.url = "required";
        }
    };
    PageValidator.prototype.idRequired = function () {
        if (!this.data.id || this.data.id.trim().length == 0) {
            this.errors.id = "required";
        }
    };
    return PageValidator;
}());
exports.default = PageValidator;
