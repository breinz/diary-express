"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loginController_1 = __importDefault(require("../../controller/loginController"));
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var router = express_1.Router();
router.post("/", userMiddleware_1.default.apiValidLogin, loginController_1.default.apiPostLogin);
exports.default = router;
