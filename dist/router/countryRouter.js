"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var countryController_1 = __importDefault(require("../controller/countryController"));
var countryMiddleware_1 = __importDefault(require("../middleware/countryMiddleware"));
var userMiddleware_1 = __importDefault(require("../middleware/userMiddleware"));
var router = express_1.Router();
router.use(userMiddleware_1.default.adminShield);
router.get("/", countryMiddleware_1.default.getCountries, countryController_1.default.getIndex);
router.get("/new", countryController_1.default.getNew);
router.post("/new", countryMiddleware_1.default.validNew, countryController_1.default.postNew);
router.get("/:id/edit", countryMiddleware_1.default.getCountry, countryController_1.default.getEdit);
router.post("/:id/edit", countryMiddleware_1.default.getCountry, countryMiddleware_1.default.validEdit, countryController_1.default.postEdit);
router.delete("/:id/delete", countryMiddleware_1.default.getCountry, countryController_1.default.deleteDelete);
exports.default = router;
