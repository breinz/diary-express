"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pageController_1 = __importDefault(require("../controller/pageController"));
var pageMiddleware_1 = __importDefault(require("../middleware/pageMiddleware"));
var RefererMiddleware_1 = __importDefault(require("../middleware/RefererMiddleware"));
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.adminShield);
router.use(function (req, res, next) {
    res.locals.menuItem = "page";
    next();
});
router.get("/", pageMiddleware_1.default.getPages, pageController_1.default.getIndex);
router.get("/new", pageController_1.default.getNew);
router.post("/new", pageMiddleware_1.default.validNew, pageController_1.default.postNew);
router.get("/:id/edit", pageMiddleware_1.default.getPage, RefererMiddleware_1.default.save, pageController_1.default.getEdit);
router.post("/:id/edit", pageMiddleware_1.default.getPage, pageMiddleware_1.default.validEdit, RefererMiddleware_1.default.retrieve, pageController_1.default.postEdit);
router.delete("/:id/delete", pageMiddleware_1.default.getPage, pageController_1.default.deleteDelete);
exports.default = router;
