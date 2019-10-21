"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mainController_1 = __importDefault(require("../controller/mainController"));
var loginRouter_1 = __importDefault(require("./loginRouter"));
var logoutRouter_1 = __importDefault(require("./logoutRouter"));
var signinRouter_1 = __importDefault(require("./signinRouter"));
var expenseRouter_1 = __importDefault(require("./expenseRouter"));
var router = express_1.Router();
router.get("/", mainController_1.default.getIndex);
router.use("/signin", signinRouter_1.default);
router.use("/login", loginRouter_1.default);
router.use("/logout", logoutRouter_1.default);
router.use("/expense", expenseRouter_1.default);
exports.default = router;
