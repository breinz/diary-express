import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { ExpenseCategoryModel } from "./ExpenseCategoryModel";

/**
 * Model
 */
export type ExpenseModel = Document & {
    amount: number,
    date: Date,
    category: Types.ObjectId | string | ExpenseCategoryModel,
}

/**
 * Schema
 */
const expenseSchema = new Schema({
    amount: Number,
    date: Date,
    category: { type: Schema.Types.ObjectId, ref: "expenseCategory" },
});

const Expense = db.model("expense", expenseSchema) as Model<Document> & ExpenseModel;
export default Expense;