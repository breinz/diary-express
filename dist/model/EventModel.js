"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var eventSchema = new mongoose_1.Schema({
    date: Date,
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "eventCategory" },
    title: String,
    description: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});
var Event = db_1.db.model("event", eventSchema);
exports.default = Event;
