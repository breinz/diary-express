"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var expenseCategorySchema = new mongoose_1.Schema({
    name: String,
    icon: String,
    color: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    report: {
        active: Boolean,
        times: Number,
        period: String,
        per: String
    },
    deleted: { type: Boolean, default: false }
});
var ExpenseCategory = db_1.db.model("expenseCategory", expenseCategorySchema);
exports.default = ExpenseCategory;
