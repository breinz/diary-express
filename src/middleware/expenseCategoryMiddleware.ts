import { Request, Response, NextFunction } from "express";

import ExpenseCategoryValidator from "../validator/ExpenseCategoryValidator";
import ExpenseCategory, { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";

class ExpenseCategoryMiddleware {

    public async getCategories(req: Request, res: Response, next?: NextFunction) {
        req.expenseCategories = await ExpenseCategory.find({ user: req.current_user, deleted: false }).sort("name") as ExpenseCategoryModel[];

        if (next) next();
    }

    public async getCategory(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.expenseCategory = await ExpenseCategory.findById(req.params.id) as ExpenseCategoryModel;
        } catch (error) {
            ok = false;
        }

        if (!req.expenseCategory || !ok) {
            req.flash("error", req.t("expenseCategory.error.not_found"));
            res.redirect("/expense/category");
        }

        next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseCategoryValidator(req.body);

        if (!validator.validNew()) {
            return res.render("expense/category/new", {
                category: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseCategoryValidator(req.body);

        if (!validator.validEdit()) {
            return res.render("expense/category/edit", {
                category: req.body,
                old: req.expenseCategory,
                errors: validator.errors
            });
        }

        next();
    }
}

const expenseCategoryMiddleware = new ExpenseCategoryMiddleware();
export default expenseCategoryMiddleware;