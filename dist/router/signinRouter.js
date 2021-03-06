"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var signinController_1 = __importDefault(require("../controller/signinController"));
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var router = express_1.Router();
router.get("/", signinController_1.default.getIndex);
router.post("/", userMiddleware_1.default.validSignin, signinController_1.default.postSignin);
exports.default = router;
