"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var dateMiddleware_1 = __importDefault(require("../../middleware/dateMiddleware"));
var expenseReportMiddleware_1 = __importDefault(require("../../middleware/expenseReportMiddleware"));
var expenseMiddleware_1 = __importDefault(require("../../middleware/expenseMiddleware"));
var expenseController_1 = __importDefault(require("../../controller/expenseController"));
var apiExpenseCategoryRouter_1 = __importDefault(require("../../router/api/apiExpenseCategoryRouter"));
var router = express_1.Router();
router.use(userMiddleware_1.default.apiFindUser, userMiddleware_1.default.tokenShield);
router.use("/category", apiExpenseCategoryRouter_1.default);
router.get("/", dateMiddleware_1.default.getPeriod, expenseMiddleware_1.default.getExpenses, expenseReportMiddleware_1.default.getMonth, expenseController_1.default.apiGetIndex);
exports.default = router;
