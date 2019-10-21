import { Request, Response, NextFunction } from "express";
import expenseCategoryMiddleware from "./expenseCategoryMiddleware";
import ExpenseValidator from "../validator/ExpenseValidator";
import Expense, { ExpenseModel } from "../model/ExpenseModel";
import { Mongoose } from "mongoose";
import Util from "../helper/Util";
import { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";

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
        req.expenses = await Expense.find().sort("-date -amount").populate("category") as ExpenseModel[];

        next();
    }

    public async getReport(req: Request, res: Response, next: NextFunction) {

        req.expenseReport = {
            total: await expenseMiddleware.getReport_total(),
            categories: await expenseMiddleware.getReport_categories()
        }

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

    private async getReport_total() {
        const util = new Util();

        let total = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: util.bom(),
                        $lte: util.bonm()
                    }
                }
            }, {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);

        return total[0].total;
    }

    private async getReport_categories(): Promise<[{ total: number, category: ExpenseCategoryModel }]> {
        const util = new Util();

        const report = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: util.bom(),
                        $lte: util.bonm()
                    }
                }
            }, {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    },
                    category: {
                        $first: "$category"
                    }
                }
            }, {
                $lookup: {
                    from: 'expensecategories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            }, {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        return <any>report;

    }
}

const expenseMiddleware = new ExpenseMiddleware();
export default expenseMiddleware;