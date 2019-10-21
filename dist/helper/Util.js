"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var date_format_1 = __importDefault(require("date-format"));
var Util = (function () {
    function Util(t) {
        this.t = t;
    }
    Util.prototype.todayOrDate = function (date) {
        if (date.getTime() > new Date().setHours(0, 0, 0, 0)) {
            return this.t.t("today");
        }
        return date_format_1.default("dd/MM/yy", date);
    };
    Util.prototype.bom = function () {
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(1);
        return d;
    };
    Util.prototype.bonm = function () {
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(1);
        d.setMonth(d.getMonth() + 1);
        return d;
    };
    return Util;
}());
exports.default = Util;
