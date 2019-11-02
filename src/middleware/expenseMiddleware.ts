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
        let [bop, eop] = expenseMiddleware.getPeriod(req);

        req.expenses = await Expense.find({ date: { $gte: bop, $lte: eop } }).sort("-date -amount").populate("category") as ExpenseModel[];

        next();
    }

    public async getReport(req: Request, res: Response, next: NextFunction) {

        let [bop, eop] = expenseMiddleware.getPeriod(req);

        let [total, categories, reports] = await Promise.all([
            expenseMiddleware.getReport_total(bop, eop),
            expenseMiddleware.getReport_categories(bop, eop),
            expenseMiddleware.getReport_report(req.current_user, bop, eop)
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

    private getPeriod(req: Request): [Date, Date] {
        let bop: Date, eop: Date;

        if (req.params.year && req.params.month) {
            bop = new Date(parseInt(req.params.year), parseInt(req.params.month) - 1, 1);
            eop = new Date(parseInt(req.params.year), parseInt(req.params.month), 1);
        } else {
            bop = req.util.bom();
            eop = req.util.bonm();
        }

        return [bop, eop];
    }

    private async getReport_total(bop: Date, eop: Date) {
        const util = new Util();

        let total = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: bop,
                        $lte: eop
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

        if (total[0]) {
            return total[0].total;
        }

        return 0;
    }

    private async getReport_categories(bop: Date, eop: Date): Promise<[{ total: number, category: ExpenseCategoryModel }]> {
        const util = new Util();

        const report = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: bop,
                        $lte: eop
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
                    from: "expensecategories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
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

    private async getReport_report(user: UserModel, bop: Date, eop: Date): Promise<any> {

        let daysIn: number;
        let d = new Date();
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        if (d.getTime() == bop.getTime()) {
            daysIn = new Date().getDate();
        } else {
            d = eop;
            d.setDate(d.getDate() - 1);
            daysIn = d.getDate();
        }

        const report = await ExpenseCategory.aggregate([
            {
                $match: {
                    "report.active": true,
                    "user": user._id
                }
            }, {
                $lookup: {
                    from: "expenses",
                    let: {
                        expense: "$_id",
                        date: "$date"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $eq: ["$category", "$$expense"]
                                        },
                                        {
                                            $gte: ["$date", bop]
                                        },
                                        {
                                            $lte: ["$date", eop]
                                        }
                                    ]
                                }
                            }
                        }
                    ],
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
                                        then: daysIn/* new Date().getDate()/* req.util.daysInMonth()*/,
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
}

const expenseMiddleware = new ExpenseMiddleware();
export default expenseMiddleware;