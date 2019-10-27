
import { UserModel } from "../model/UserModel";
import { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { ExpenseModel } from "../model/ExpenseModel";
import Util from "../helper/Util";
import { CountryModel } from "../model/CountryModel";
import { PeopleModel } from "../model/PeopleModel";

declare global {
    namespace Express {
        export interface Request {
            t: (phrase: string, ...args: (string | number)[]) => string,
            user: UserModel,
            current_user: UserModel,
            lang: string,

            expense: ExpenseModel,
            expenses: ExpenseModel[],

            expenseCategories: ExpenseCategoryModel[],
            expenseCategory: ExpenseCategoryModel,
            expenseReport: { total: number, categories: [{ total: number, category: ExpenseCategoryModel }], reports: any },

            people: PeopleModel,
            peoples: PeopleModel[],

            country: CountryModel,
            countries: CountryModel[],

            referer: string,

            util: Util,

            flash: (type: string, message: string) => void
        }
    }

}