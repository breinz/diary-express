"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userMiddleware_1 = __importDefault(require("../../middleware/userMiddleware"));
var apiCountryMiddleware_1 = __importDefault(require("../../middleware/api/apiCountryMiddleware"));
var apiCountryController_1 = __importDefault(require("../../controller/api/apiCountryController"));
var router = express_1.Router();
router.use(userMiddleware_1.default.apiFindUser, userMiddleware_1.default.tokenShield);
router.get("/", apiCountryMiddleware_1.default.getCountries, apiCountryController_1.default.getCountries);
router.post('/', apiCountryController_1.default.post);
router.patch('/', apiCountryMiddleware_1.default.getCountry, apiCountryController_1.default.patch);
router.delete("/", apiCountryMiddleware_1.default.getCountry, apiCountryController_1.default.delete);
exports.default = router;
