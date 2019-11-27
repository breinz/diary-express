import { Request, Response, NextFunction } from "express";

import ExpenseCategoryValidator from "../../validator/ExpenseCategoryValidator";
import ExpenseCategory, { ExpenseCategoryModel } from "../../model/ExpenseCategoryModel";

class ApiExpenseCategoryMiddleware {
    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseCategoryValidator(req.body);

        if (!validator.validNew()) {
            return res.status(400).json({ errors: validator.errors });
        }

        next();
    }

    public validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseCategoryValidator(req.body);

        if (!validator.validEdit()) {
            return res.status(400).json({ errors: validator.errors });
        }

        next();
    }

    public async getCategories(req: Request, res: Response, next?: NextFunction) {
        req.expenseCategories = await ExpenseCategory.find({ user: req.current_user }).sort("name") as ExpenseCategoryModel[];

        if (next) next();
    }

    public async getCategory(req: Request, res: Response, next: NextFunction) {
        console.log(req.query);
        let ok = true;
        try {
            req.expenseCategory = await ExpenseCategory.findById(req.query.id) as ExpenseCategoryModel;
        } catch (error) {
            ok = false;
        }

        if (!req.expenseCategory || !ok) {
            return res.status(404).send();
        }

        next();
    }
}

const middleware = new ApiExpenseCategoryMiddleware();
export default middleware;