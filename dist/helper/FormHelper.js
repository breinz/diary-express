"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormHelper = (function () {
    function FormHelper(query, target) {
        this.query = query;
        this.target = target;
    }
    FormHelper.prototype.extractDate = function (key) {
        if (this.query[key] && this.query[key].match(/^\d{4}-\d{2}-\d{2}$/)) {
            var d = new Date(this.query[key]);
            if (isNaN(d.getTime())) {
                d = null;
            }
            this.target[key] = d;
        }
    };
    FormHelper.prototype.extractString = function (key) {
        if (this.query[key]) {
            this.target[key] = this.query[key];
        }
    };
    return FormHelper;
}());
exports.default = FormHelper;
