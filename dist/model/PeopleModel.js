"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var peopleSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    sexe: Boolean,
    age: Number,
    metIn: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    deleted: { type: Boolean, default: false }
});
var People = db_1.db.model("people", peopleSchema);
exports.default = People;
