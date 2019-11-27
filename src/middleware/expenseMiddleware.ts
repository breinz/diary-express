import { Request, Response, NextFunction } from "express";
import expenseCategoryMiddleware from "./expenseCategoryMiddleware";
import ExpenseValidator from "../validator/ExpenseValidator";
import Expense, { ExpenseModel } from "../model/ExpenseModel";
import FormHelper from "../helper/FormHelper";

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
        //expenseMiddleware.getPeriod(req);

        req.expenses = await Expense.find({ date: { $gte: req.bop, $lte: req.eop }, user: req.current_user }).sort("-date -amount").populate("category") as ExpenseModel[];

        next();
    }

    public initForm(req: Request, res: Response, next: NextFunction) {
        res.locals.expense = {};

        const formHelper = new FormHelper(req.query, res.locals.expense);

        formHelper.extractDate("date");

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

    public validMonth(req: Request, res: Response, next: NextFunction) {
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
     * @deprecated
     * @see dateMiddleware.getPeriod
     */
    /*public getPeriod(req: Request) {
        if (req.params.year) {
            
            const year = parseInt(req.params.year);
            
            if (req.params.month) {

                const month = parseInt(req.params.month);
                
                req.bop = new Date(year, month - 1, 1);
                req.eop = new Date(year, month, 1);

            } else {

                req.bop = new Date(year, 0, 1);
                req.eop = new Date(year + 1, 0, 1);

            }

        } else {

            req.bop = req.util.bom();
            req.eop = req.util.bonm();

        }
    }*/
}

const expenseMiddleware = new ExpenseMiddleware();
export default expenseMiddleware;