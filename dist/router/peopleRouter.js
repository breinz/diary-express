"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var peopleController_1 = __importDefault(require("../controller/peopleController"));
var router = express_1.Router();
router.get("/", peopleController_1.default.getIndex);
router.get("/new", peopleController_1.default.getNew);
exports.default = router;
