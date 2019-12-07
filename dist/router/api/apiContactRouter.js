"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiContactController_1 = __importDefault(require("./../../controller/api/apiContactController"));
var router = express_1.Router();
router.post("/", apiContactController_1.default.post);
exports.default = router;
