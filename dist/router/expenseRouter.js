"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var expenseCategoryRouter_1 = __importDefault(require("./expenseCategoryRouter"));
var expenseController_1 = __importDefault(require("../controller/expenseController"));
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var expenseCategoryMiddleware_1 = __importDefault(require("../middleware/expenseCategoryMiddleware"));
var expenseMiddleware_1 = __importDefault(require("../middleware/expenseMiddleware"));
var RefererMiddleware_1 = __importDefault(require("../middleware/RefererMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.adminShield);
router.use("/category", expenseCategoryRouter_1.default);
router.get("/", expenseMiddleware_1.default.getExpenses, expenseMiddleware_1.default.getReport, expenseController_1.default.getIndex);
router.get("/new", expenseCategoryMiddleware_1.default.getCategories, expenseController_1.default.getNew);
router.post('/new', expenseMiddleware_1.default.validNew, expenseController_1.default.postNew);
router.get("/:id/edit", expenseCategoryMiddleware_1.default.getCategories, expenseMiddleware_1.default.getExpense, RefererMiddleware_1.default.save, expenseController_1.default.getEdit);
router.post("/:id/edit", expenseMiddleware_1.default.getExpense, expenseMiddleware_1.default.validEdit, RefererMiddleware_1.default.retrieve, expenseController_1.default.postEdit);
router.delete("/:id/delete", expenseMiddleware_1.default.getExpense, expenseController_1.default.deleteDelete);
router.get("/:id", expenseMiddleware_1.default.getExpensePopulated, expenseController_1.default.getExpense);
exports.default = router;
