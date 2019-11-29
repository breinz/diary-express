"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var countrySchema = new mongoose_1.Schema({
    name: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" }
});
var Country = db_1.db.model("country", countrySchema);
exports.default = Country;
