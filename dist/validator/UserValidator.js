"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserValidator = (function () {
    function UserValidator(data) {
        this.data = data;
        this.errors = {};
    }
    UserValidator.prototype.validSignin = function () {
        this.emailRequired();
        this.emailValid();
        this.passwordRequired();
        this.passwordRepeatRequired();
        this.passwordValid();
        this.passwordsMatch();
        return Object.keys(this.errors).length == 0;
    };
    UserValidator.prototype.validLogin = function () {
        this.emailRequired();
        this.emailValid();
        this.passwordRequired();
        this.passwordValid();
        return Object.keys(this.errors).length == 0;
    };
    UserValidator.prototype.emailRequired = function () {
        if (!this.data.email || this.data.email.trim().length == 0) {
            this.errors.email = "required";
        }
    };
    UserValidator.prototype.emailValid = function () {
        if (!RegExp(UserValidator.EMAIL_REGEXP).test(this.data.email)) {
            this.errors.email = this.errors.email || "unvalid";
        }
    };
    UserValidator.prototype.passwordRequired = function () {
        if (!this.data.password || this.data.password.trim().length == 0) {
            this.errors.password = "required";
        }
    };
    UserValidator.prototype.passwordRepeatRequired = function () {
        if (!this.data.password_repeat || this.data.password_repeat.trim().length == 0) {
            this.errors.password_repeat = "required";
        }
    };
    UserValidator.prototype.passwordValid = function () {
        if (this.data.password && this.data.password.length < 4) {
            this.errors.password = this.errors.password || "unvalid";
        }
    };
    UserValidator.prototype.passwordsMatch = function () {
        if (this.data.password != this.data.password_repeat) {
            this.errors.password = this.errors.password || "no_match";
        }
    };
    UserValidator.EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^ <>() \[\]\\.,;: \s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return UserValidator;
}());
exports.default = UserValidator;
