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
    Util.prototype.icon = function (element, defaut) {
        if (element == null || element.icon == null || element.icon.trim().length == 0) {
            switch (defaut) {
                case "eventCategory":
                case "event":
                    return "fa-calendar-alt";
                case "expenseCategory":
                case "expense":
                    return "fa-euro-sign";
                case "people":
                    return "fa-user";
                default:
                    return "fa-question";
            }
        }
        else {
            return "fa-" + element.icon;
        }
    };
    Util.prototype.icon_color = function (element, defaut) {
        if (element == null || element.color == null || element.color.trim().length == 0) {
            if (defaut === "event" || defaut === "expense") {
                return this.t.t(defaut + "Category.none.color");
            }
            return "#CCC";
        }
        return element.color;
    };
    return Util;
}());
exports.default = Util;
