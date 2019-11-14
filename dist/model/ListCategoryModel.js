"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var listCategorySchema = new mongoose_1.Schema({
    name: String,
    icon: String,
    color: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});
var ListCategory = db_1.db.model("listCategory", listCategorySchema);
exports.default = ListCategory;
