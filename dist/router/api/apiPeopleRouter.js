"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiPeopleMiddleware_1 = __importDefault(require("../../middleware/api/apiPeopleMiddleware"));
var apiPeopleController_1 = __importDefault(require("../../controller/api/apiPeopleController"));
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.apiFindUser, userMiddleware_1.default.tokenShield);
router.get('/', apiPeopleMiddleware_1.default.getList, apiPeopleController_1.default.getList);
router.post("/", apiPeopleMiddleware_1.default.validNew, apiPeopleController_1.default.post);
router.patch("/", apiPeopleMiddleware_1.default.getPeople, apiPeopleController_1.default.patch);
router.delete("/", apiPeopleMiddleware_1.default.getPeople, apiPeopleController_1.default.delete);
exports.default = router;
