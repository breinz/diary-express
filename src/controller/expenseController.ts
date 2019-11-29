import { Request, Response, NextFunction } from "express";
import Expense, { ExpenseModel } from "../model/ExpenseModel";

class ExpenseController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("expense/index", {
            expenses: req.expenses,
            report: req.expenseReport
        });
    }

    public apiGetIndex(req: Request, res: Response, next: NextFunction) {
        res.json({
            expenses: req.expenses,
            report: req.expenseReport
        });
    }

    public getExpense(req: Request, res: Response, next: NextFunction) {
        res.render("expense/expense", {
            expense: req.expense
        })
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("expense/new", {
            categories: req.expenseCategories
        });
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        req.expense = await Expense.create(req.body) as ExpenseModel;

        req.flash("success", req.t("expense.flash.created"));

        res.redirect(req.referer);

        next();
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("expense/edit", {
            expense: req.expense,
            categories: req.expenseCategories,
            cache: false
        })
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.expense, req.body);

        await req.expense.save();

        req.flash("success", req.t("expense.flash.edited"));

        res.redirect(req.referer);

        next();
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        try {
            await Expense.deleteOne({ _id: req.expense._id });
        } catch (error) {
            req.flash("error", req.t("flash.error.unknown"));

            return res.json({ success: true, redirect: "/expense" });
        }

        req.flash("success", req.t("expense.flash.deleted"));

        return res.json({ success: true, redirect: "/expense" });

        next();
    }

    public getMonth(req: Request, res: Response, next: NextFunction) {
        res.render("expense/index", {
            expenses: req.expenses,
            report: req.expenseReport,
            month: req.params.month,
            year: req.params.year
        });
    }

    public getYear(req: Request, res: Response, next: NextFunction) {
        res.render("expense/year", {
            report: req.expenseReport,
            year: req.params.year
        });
    }
}

const expenseController = new ExpenseController();
export default expenseController;