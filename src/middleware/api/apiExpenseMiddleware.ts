import { Request, Response, NextFunction } from "express";
import ExpenseValidator from "../../validator/ExpenseValidator";
import expenseCategoryMiddleware from "../expenseCategoryMiddleware";
import Expense, { ExpenseModel } from "../../model/ExpenseModel";

class ApiExpenseMiddleware {

    public async getExpense(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.expense = await Expense.findById(req.query.id).populate("category") as ExpenseModel;
        } catch (e) {
            ok = false;
        }

        if (!ok) {
            return res.status(404).send();
        }

        next();
    }

    public async validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseValidator(req.body);

        if (!validator.validNew()) {
            //await expenseCategoryMiddleware.getCategories(req, res);

            return res.status(400).json({
                errors: validator.errors
            });
        }

        next();
    }
}

const apiExpenseMiddleware = new ApiExpenseMiddleware();
export default apiExpenseMiddleware;