"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiExpenseRouter_1 = __importDefault(require("./api/apiExpenseRouter"));
var apiLoginRouter_1 = __importDefault(require("./api/apiLoginRouter"));
var apiSigninRouter_1 = __importDefault(require("./api/apiSigninRouter"));
var apiUserRouter_1 = __importDefault(require("./api/apiUserRouter"));
var router = express_1.Router();
router.use("/login", apiLoginRouter_1.default);
router.use("/signin", apiSigninRouter_1.default);
router.use("/user", apiUserRouter_1.default);
router.use("/expense", apiExpenseRouter_1.default);
exports.default = router;
