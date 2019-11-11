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
        var d = new Date();
        if (date.getTime() > d.setHours(0, 0, 0, 0)) {
            return this.t.t("today");
        }
        else {
            d.setDate(d.getDate() - 1);
            d.setHours(0, 0, 0, 0);
            if (date.getTime() > d.getTime()) {
                return this.t.t("yesterday");
            }
            return date_format_1.default("dd/MM/yy", date);
        }
    };
    Util.prototype.dateToInput = function (date) {
        return new Date(date).toISOString().substr(0, 10);
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
    Util.prototype.daysInMonth = function (date) {
        var d = date || new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() + 1);
        d.setDate(d.getDate() - 1);
        return d.getDate();
    };
    Util.prototype.prevMonth_url = function () {
        var d = new Date();
        d.setMonth(d.getMonth());
        return d.getFullYear() + "-" + (this.zero(d.getMonth()));
    };
    Util.prototype.zero = function (value) {
        if (value <= 9) {
            return "0" + value;
        }
        return value.toString();
    };
    return Util;
}());
exports.default = Util;
