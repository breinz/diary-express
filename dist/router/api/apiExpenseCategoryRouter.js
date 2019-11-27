"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiExpenseCategoryMiddleware_1 = __importDefault(require("../../middleware/api/apiExpenseCategoryMiddleware"));
var apiExpenseCategoryController_1 = __importDefault(require("../../controller/api/apiExpenseCategoryController"));
var router = express_1.Router();
router.get("/", apiExpenseCategoryMiddleware_1.default.getCategories, apiExpenseCategoryController_1.default.getIndex);
router.post("/new", apiExpenseCategoryMiddleware_1.default.validNew, apiExpenseCategoryController_1.default.postNew);
router.post("/edit", apiExpenseCategoryMiddleware_1.default.getCategory, apiExpenseCategoryMiddleware_1.default.validEdit, apiExpenseCategoryController_1.default.postEdit);
router.patch("/delete", apiExpenseCategoryMiddleware_1.default.getCategory, apiExpenseCategoryController_1.default.patchDelete);
router.patch("/recover", apiExpenseCategoryMiddleware_1.default.getCategory, apiExpenseCategoryController_1.default.patchRecover);
router.delete("/remove", apiExpenseCategoryMiddleware_1.default.getCategory, apiExpenseCategoryController_1.default.deleteRemove);
exports.default = router;
