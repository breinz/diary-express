import { Request, Response, NextFunction } from "express";
import Expense, { ExpenseModel } from "../../model/ExpenseModel";

class ApiExpenseController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.json(req.expenses);
    }

    public getExpense(req: Request, res: Response, next: NextFunction) {
        res.json(req.expense);
    }

    public async patchExpense(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.expense, req.body);

        await req.expense.save();

        res.json({ ok: true });
    }

    public getReport(req: Request, res: Response, next: NextFunction) {
        res.json(req.expenseReport);
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        req.expense = await Expense.create(req.body) as ExpenseModel;

        res.json({ ok: true });

        next();
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        await Expense.deleteOne({ _id: req.expense._id });

        res.json({ ok: true });
    }
}

const apiExpenseController = new ApiExpenseController();
export default apiExpenseController;