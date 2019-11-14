"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var listSchema = new mongoose_1.Schema({
    title: String,
    icon: String,
    color: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    items: [
        {
            title: String
        }
    ]
});
var List = db_1.db.model("list", listSchema);
exports.default = List;
