"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var listMiddleware_1 = __importDefault(require("../middleware/listMiddleware"));
var listController_1 = __importDefault(require("../controller/listController"));
var RefererMiddleware_1 = __importDefault(require("../middleware/RefererMiddleware"));
var router = express_1.Router();
router.use(function (req, res, next) {
    res.locals.menuItem = "list";
    next();
});
router.get("/", listMiddleware_1.default.getLists, listController_1.default.getIndex);
router.get("/new", RefererMiddleware_1.default.save, listController_1.default.getNew);
router.post("/new", listMiddleware_1.default.validNew, RefererMiddleware_1.default.retrieve, listController_1.default.postNew);
exports.default = router;
