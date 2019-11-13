"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var eventCategoryRouter_1 = __importDefault(require("./eventCategoryRouter"));
var eventController_1 = __importDefault(require("../controller/eventController"));
var eventMiddleware_1 = __importDefault(require("../middleware/eventMiddleware"));
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var eventCategoryMiddleware_1 = __importDefault(require("../middleware/eventCategoryMiddleware"));
var RefererMiddleware_1 = __importDefault(require("../middleware/RefererMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.adminShield);
router.use(function (req, res, next) {
    res.locals.menuItem = "event";
    next();
});
router.use("/category", eventCategoryRouter_1.default);
router.get("/", eventMiddleware_1.default.getEvents, eventController_1.default.getIndex);
router.get("/new", RefererMiddleware_1.default.save, eventCategoryMiddleware_1.default.getForSelect, eventController_1.default.getNew);
router.post("/new", eventMiddleware_1.default.validNew, RefererMiddleware_1.default.retrieve, eventController_1.default.postNew);
router.get("/:id/edit", eventMiddleware_1.default.getEvent, eventCategoryMiddleware_1.default.getForSelect, RefererMiddleware_1.default.save, eventController_1.default.getEdit);
router.post("/:id/edit", eventMiddleware_1.default.validEdit, eventMiddleware_1.default.getEvent, RefererMiddleware_1.default.retrieve, eventController_1.default.postEdit);
router.delete("/:id/delete", eventMiddleware_1.default.getEvent, eventController_1.default.deleteDelete);
router.get("/:id", eventMiddleware_1.default.getEvent, eventController_1.default.getEvent);
exports.default = router;
