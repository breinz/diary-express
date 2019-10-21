
import { UserModel } from "../model/UserModel";
import { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { ExpenseModel } from "../model/ExpenseModel";

declare global {
    namespace Express {
        export interface Request {
            t: (phrase: string, ...args: (string | number)[]) => string,
            user: UserModel,
            current_user: UserModel,
            lang: string,

            expenseCategories: ExpenseCategoryModel[],
            expenseCategory: ExpenseCategoryModel,
            expenseReport: { total: number, categories: [{ total: number, category: ExpenseCategoryModel }] },

            expense: ExpenseModel,
            expenses: ExpenseModel[],

            referer: string,

            flash: (type: string, message: string) => void
        }
    }

}