import { Document, Schema, Model, Types } from "mongoose"

import { db } from "../db"
import { UserModel } from "./UserModel";

/**
 * Model
 */
export type ExpenseCategoryModel = Document & {
    name: string,
    icon: string,
    color: string,
    user: Types.ObjectId | string | UserModel,
    report: {
        average: boolean,
        per_day: number
    }
    deleted: boolean
}

/**
 * Schema
 */
const expenseCategorySchema = new Schema({
    name: String,
    icon: String,
    color: String,
    user: { type: Schema.Types.ObjectId, ref: "user" },
    report: {
        average: Boolean,
        per_day: Number
    },
    deleted: { type: Boolean, default: false }
});

const ExpenseCategory = db.model("expenseCategory", expenseCategorySchema) as Model<Document> & ExpenseCategoryModel;
export default ExpenseCategory;