"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var db_1 = require("../db");
var expenseSchema = new mongoose_1.Schema({
    amount: Number,
    date: Date,
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "expenseCategory" },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    description: String
});
var Expense = db_1.db.model("expense", expenseSchema);
exports.default = Expense;
