"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventValidator = (function () {
    function EventValidator(data) {
        this.data = data;
        this.errors = {};
    }
    EventValidator.prototype.validNew = function () {
        this.titleRequired();
        this.categoryValid();
        return Object.keys(this.errors).length == 0;
    };
    EventValidator.prototype.titleRequired = function () {
        if (!this.data.title || this.data.title.trim().length == 0) {
            this.errors.title = "required";
        }
    };
    EventValidator.prototype.categoryValid = function () {
        if (this.data.category == "null") {
            this.data.category = null;
        }
    };
    return EventValidator;
}());
exports.default = EventValidator;
