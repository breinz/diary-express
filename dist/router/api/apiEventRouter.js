"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiEventCategoryRouter_1 = __importDefault(require("./apiEventCategoryRouter"));
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var apiEventMiddleware_1 = __importDefault(require("../../middleware/api/apiEventMiddleware"));
var apiEventController_1 = __importDefault(require("../../controller/api/apiEventController"));
var router = express_1.Router();
router.use(userMiddleware_1.default.apiFindUser, userMiddleware_1.default.tokenShield);
router.use("/category", apiEventCategoryRouter_1.default);
router.get('/', apiEventMiddleware_1.default.getList, apiEventController_1.default.getList);
router.get('/event', apiEventMiddleware_1.default.getEvent, apiEventController_1.default.getEvent);
router.post("/", apiEventController_1.default.post);
router.patch("/", apiEventMiddleware_1.default.getEvent, apiEventController_1.default.patch);
router.delete("/", apiEventMiddleware_1.default.getEvent, apiEventController_1.default.delete);
exports.default = router;
