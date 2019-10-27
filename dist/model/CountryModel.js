"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var countrySchema = new mongoose_1.Schema({
    name: String,
});
var Country = db_1.db.model("country", countrySchema);
exports.default = Country;
