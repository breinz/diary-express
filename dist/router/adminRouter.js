"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var adminController_1 = __importDefault(require("../controller/adminController"));
var router = express_1.Router();
router.use(userMiddleware_1.default.adminShield);
router.get("/", adminController_1.default.getIndex);
exports.default = router;
