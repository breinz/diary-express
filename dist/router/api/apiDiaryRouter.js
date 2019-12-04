"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiDateMiddleware_1 = __importDefault(require("../../middleware/api/apiDateMiddleware"));
var journalMiddleware_1 = __importDefault(require("../../middleware/journalMiddleware"));
var apiDiaryController_1 = __importDefault(require("../../controller/api/apiDiaryController"));
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.apiFindUser, userMiddleware_1.default.tokenShield);
router.get("/", apiDateMiddleware_1.default.getPeriod, journalMiddleware_1.default.getElements, apiDiaryController_1.default.getIndex);
router.get("/day", apiDateMiddleware_1.default.getPeriod, journalMiddleware_1.default.getDayElements, apiDiaryController_1.default.getDay);
exports.default = router;
