"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var pageSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    url: String,
    id: String,
    deleted: { type: Boolean, default: false }
});
var Page = db_1.db.model("page", pageSchema);
exports.default = Page;
