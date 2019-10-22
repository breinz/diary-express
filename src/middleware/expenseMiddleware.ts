import { Request, Response, NextFunction } from "express";
import expenseCategoryMiddleware from "./expenseCategoryMiddleware";
import ExpenseValidator from "../validator/ExpenseValidator";
import Expense, { ExpenseModel } from "../model/ExpenseModel";
import Util from "../helper/Util";
import ExpenseCategory, { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";

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

        let [total, categories, reports] = await Promise.all([
            expenseMiddleware.getReport_total(),
            expenseMiddleware.getReport_categories(),
            expenseMiddleware.getReport_report(req)
        ]);

        req.expenseReport = {
            total,
            categories,
            reports
        };

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
            }, {
                $sort: {
                    total: -1
                }
            }
        ]);

        return <any>report;
    }

    private async getReport_report(req: Request): Promise<any> {

        const report = await ExpenseCategory.aggregate([
            {
                $match: {
                    "report.active": true,
                    "user": req.current_user._id
                }
            }, {
                $lookup: {
                    from: 'expenses',
                    let: {
                        expense: "$_id",
                        date: "$date"
                    },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $and: [{
                                    $eq: ["$category", "$$expense"]
                                },
                                {
                                    $gte: ["$date", req.util.bom()]
                                },
                                {
                                    $lte: ["$date", req.util.bonm()]
                                }
                                ]
                            }
                        }
                    }],
                    as: 'expenses'
                }
            }, {
                $addFields: {
                    "report.value": {
                        $divide: [{
                            $sum: "$expenses.amount"
                        }, {
                            $multiply: [
                                "$report.times",
                                {
                                    $cond: {
                                        if: {
                                            $eq: ["$report.period", "day"]
                                        },
                                        then: new Date().getDate()/* req.util.daysInMonth()*/,
                                        else: 20
                                    }
                                }

                            ]
                        }]
                    }
                }
            }
        ]);

        return report;
    }
}

const expenseMiddleware = new ExpenseMiddleware();
export default expenseMiddleware;