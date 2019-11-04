"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var peopleNoteController_1 = __importDefault(require("../controller/peopleNoteController"));
var RefererMiddleware_1 = __importDefault(require("../middleware/RefererMiddleware"));
var router = express_1.Router();
router.get("/new", RefererMiddleware_1.default.save, peopleNoteController_1.default.getNew);
router.post("/new", RefererMiddleware_1.default.retrieve, peopleNoteController_1.default.postNew);
router.get("/:index/edit", RefererMiddleware_1.default.save, peopleNoteController_1.default.getEdit);
router.post("/:index/edit", RefererMiddleware_1.default.retrieve, peopleNoteController_1.default.postEdit);
router.delete("/:index/delete", peopleNoteController_1.default.deleteDelete);
exports.default = router;
