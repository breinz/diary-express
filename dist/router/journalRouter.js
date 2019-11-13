"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var journalController_1 = __importDefault(require("../controller/journalController"));
var journalMiddleware_1 = __importDefault(require("../middleware/journalMiddleware"));
var dateMiddleware_1 = __importDefault(require("../middleware/dateMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.adminShield);
router.use(function (req, res, next) {
    res.locals.menuItem = "journal";
    next();
});
router.get("/", dateMiddleware_1.default.getPeriod, journalMiddleware_1.default.getElements, journalController_1.default.getIndex);
router.get("/:year(\\d{4})-:month(\\d{1,2})/", journalMiddleware_1.default.validMonth, dateMiddleware_1.default.getPeriod, journalMiddleware_1.default.getElements, journalController_1.default.getIndex);
router.get("/:year(\\d{4})-:month(\\d{1,2})-:day(\\d{1,2})/", dateMiddleware_1.default.getPeriod, journalMiddleware_1.default.getDayElements, journalController_1.default.getDay);
exports.default = router;
