"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiEventCategoryController_1 = __importDefault(require("../../controller/api/apiEventCategoryController"));
var apiEventCategoryMiddleware_1 = __importDefault(require("../../middleware/api/apiEventCategoryMiddleware"));
var router = express_1.Router();
router.get("/", apiEventCategoryMiddleware_1.default.getList, apiEventCategoryController_1.default.getList);
router.get("/category", apiEventCategoryMiddleware_1.default.getItemPopulated, apiEventCategoryController_1.default.getItem);
router.post("/", apiEventCategoryController_1.default.post);
router.patch('/', apiEventCategoryMiddleware_1.default.getItem, apiEventCategoryController_1.default.patch);
router.delete('/', apiEventCategoryMiddleware_1.default.getItem, apiEventCategoryController_1.default.delete);
exports.default = router;
