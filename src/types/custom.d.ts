
import { UserModel } from "../model/UserModel";
import { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { ExpenseModel } from "../model/ExpenseModel";
import Util from "../helper/Util";
import { CountryModel } from "../model/CountryModel";
import { PeopleModel } from "../model/PeopleModel";
import { PageModel } from "../model/PageModel";
import { EventCategoryModel } from "../model/EventCategoryModel";
import { EventModel } from "../model/EventModel";

declare global {

    namespace Express {
        export interface Request {
            t: (phrase: string, ...args: (string | number)[]) => string,
            user: UserModel,
            current_user: UserModel,
            lang: string,
            bop: Date, // Begining Of Period 
            eop: Date,// End Of Period

            expense: ExpenseModel,
            expenses: ExpenseModel[],

            expenseCategories: ExpenseCategoryModel[],
            expenseCategory: ExpenseCategoryModel,
            expenseReport: { total: number, categories: [{ total: number, category: ExpenseCategoryModel }], reports: any },

            people: PeopleModel,
            peoples: PeopleModel[],

            country: CountryModel,
            countries: CountryModel[],

            page: PageModel,
            pages: PageModel[],

            event: EventModel,
            events: EventModel[],

            eventCategories: EventCategoryModel[],
            eventCategory: EventCategoryModel,

            referer: string,

            util: Util,

            flash: (type: string, message: string) => void
        }
    }

}