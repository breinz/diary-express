"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventCategoryValidator = (function () {
    function EventCategoryValidator(data) {
        this.data = data;
        this.errors = {};
    }
    EventCategoryValidator.prototype.validNew = function () {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        return Object.keys(this.errors).length == 0;
    };
    EventCategoryValidator.prototype.validEdit = function () {
        this.nameRequired();
        this.iconRequired();
        this.colorRequired();
        return Object.keys(this.errors).length == 0;
    };
    EventCategoryValidator.prototype.nameRequired = function () {
        if (!this.data.name || this.data.name.trim().length == 0) {
            this.errors.name = "required";
        }
    };
    EventCategoryValidator.prototype.iconRequired = function () {
        if (!this.data.icon || this.data.icon.trim().length == 0) {
            this.errors.icon = "required";
        }
    };
    EventCategoryValidator.prototype.colorRequired = function () {
        if (!this.data.color || this.data.color.trim().length == 0) {
            this.errors.color = "required";
        }
    };
    return EventCategoryValidator;
}());
exports.default = EventCategoryValidator;
