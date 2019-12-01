"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiEventCategoryRouter_1 = __importDefault(require("./apiEventCategoryRouter"));
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.apiFindUser, userMiddleware_1.default.tokenShield);
router.use("/category", apiEventCategoryRouter_1.default);
exports.default = router;
