import { Request, Response, NextFunction } from "express";
import expenseCategoryMiddleware from "./expenseCategoryMiddleware";
import ExpenseValidator from "../validator/ExpenseValidator";
import Expense, { ExpenseModel } from "../model/ExpenseModel";
import Util from "../helper/Util";
import ExpenseCategory, { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { UserModel } from "../model/UserModel";

class ExpenseMiddleware {

    public async getExpense(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.expense = await Expense.findById(req.params.id) as ExpenseModel;
        } catch (error) {
            ok = false;
        }

        if (!req.expense || !ok) {
            req.flash("error", req.t("expense.flash.error.not_found"));
            res.redirect("/expense");
        }

        next();
    }

    public async getExpensePopulated(req: Request, res: Response, next: NextFunction) {

        let ok = true;
        try {
            req.expense = await Expense.findById(req.params.id).populate("category") as ExpenseModel;
        } catch (error) {
            ok = false;
        }

        if (!req.expense || !ok) {
            req.flash("error", req.t("expense.flash.error.not_found"));

            return res.redirect("/expense");
        }

        next();
    }

    public async getExpenses(req: Request, res: Response, next: NextFunction) {
        expenseMiddleware.getPeriod(req);

        req.expenses = await Expense.find({ date: { $gte: req.bop, $lte: req.eop } }).sort("-date -amount").populate("category") as ExpenseModel[];

        next();
    }

    public async validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseValidator(req.body);

        if (!validator.validNew()) {
            await expenseCategoryMiddleware.getCategories(req, res);

            return res.render("expense/new", {
                expense: req.body,
                errors: validator.errors,
                categories: req.expenseCategories
            });
        }

        next();
    }

    public async validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new ExpenseValidator(req.body);

        if (!validator.validEdit()) {
            await expenseCategoryMiddleware.getCategories(req, res);

            return res.render("expense/edit", {
                expense: req.body,
                errors: validator.errors,
                categories: req.expenseCategories
            });
        }

        next();
    }

    public getMonth(req: Request, res: Response, next: NextFunction) {
        if (req.params.month && req.params.year) {
            if (parseInt(req.params.month) <= 0) {
                return res.redirect(`/expense/${parseInt(req.params.year) - 1}-12`);
            }
            if (parseInt(req.params.month) >= 13) {
                return res.redirect(`/expense/${parseInt(req.params.year) + 1}-1`);
            }
        }
        next();
    }

    public async getYear(req: Request, res: Response, next: NextFunction) {
        next();
    }

    /**
     * Guess the period viewed
     * @param req 
     */
    public getPeriod(req: Request) {
        if (req.params.year) {
            if (req.params.month) {
                req.bop = new Date(parseInt(req.params.year), parseInt(req.params.month) - 1, 1);
                req.eop = new Date(parseInt(req.params.year), parseInt(req.params.month), 1);
            } else {
                req.bop = new Date(parseInt(req.params.year), 0, 1);
                req.eop = new Date(parseInt(req.params.year) + 1, 0, 1);
            }
        } else {
            req.bop = req.util.bom();
            req.eop = req.util.bonm();
        }
    }
}

const expenseMiddleware = new ExpenseMiddleware();
export default expenseMiddleware;