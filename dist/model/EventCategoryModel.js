"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var eventCategorySchema = new mongoose_1.Schema({
    name: String,
    icon: String,
    color: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});
var EventCategory = db_1.db.model("eventCategory", eventCategorySchema);
exports.default = EventCategory;