import { Request, Response, NextFunction } from "express";
import Expense from "../model/ExpenseModel";
import ExpenseCategory, { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { UserModel } from "../model/UserModel";
import expenseMiddleware from "./expenseMiddleware";

class ExpenseReportMiddleware {

    private req: Request;

    private bop: Date;
    private eop: Date;

    public async getReport(req: Request, res: Response, next: NextFunction) {
        expenseReportMiddleware.req = req;

        let [bop, eop] = expenseMiddleware.getPeriod(req);

        expenseReportMiddleware.bop = bop;
        expenseReportMiddleware.eop = eop;

        let [total, categories, reports] = await Promise.all([
            expenseReportMiddleware.getTotal(),
            expenseReportMiddleware.getCategories(),
            expenseReportMiddleware.getReport_report(req.current_user, bop, eop)
        ]);

        req.expenseReport = {
            total,
            categories,
            reports
        };

        next();

    }

    /**
     * Get total expenses for a given period
     */
    private async getTotal() {

        // Get saved value || NaN
        let total = this.getTotalSaved();
        if (!isNaN(total)) {
            return total;
        }

        let total_query = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: this.bop,
                        $lt: this.eop
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

        total = 0;
        if (total_query[0]) {
            total = total_query[0].total;
        }

        // Save it for further use
        await this.saveTotal(total);

        return total;
    }

    /**
     * Check if this total has been saved (skip the calculation)
     */
    private getTotalSaved(): number {

        for (let i = 0; i < this.req.current_user.expense.month.total.length; i++) {
            const total_save = this.req.current_user.expense.month.total[i];

            if (total_save.date.getTime() == this.bop.getTime() && !total_save.dirty) {
                return total_save.total;
            }
        };

        return NaN;
    }

    /**
     * Save the report total so this shortcut can be used next time needed 
     * instead of making the calculation
     */
    private async saveTotal(total: number) {
        // Remove last saved values
        for (let i = this.req.current_user.expense.month.total.length - 1; i >= 0; i--) {
            const old = this.req.current_user.expense.month.total[i];
            if (old.date.getTime() == this.bop.getTime()) {
                this.req.current_user.expense.month.total.splice(i, 1);
            }
        }

        // Add this value
        this.req.current_user.expense.month.total.push({
            date: this.bop,
            total: total,
            dirty: false
        });

        await this.req.current_user.save();
    }

    private async getCategories(): Promise<[{ total: number, category: ExpenseCategoryModel }]> {

        const report = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: this.bop,
                        $lte: this.eop
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

        await this.saveCategories(<any>report);

        return <any>report;
    }

    private async saveCategories(categories: [{ total: number, category: ExpenseCategoryModel }]) {
        // Remove last saved values
        for (let i = this.req.current_user.expense.month.categories.length - 1; i >= 0; i--) {
            const old = this.req.current_user.expense.month.categories[i];
            if (old.date.getTime() == this.bop.getTime()) {
                this.req.current_user.expense.month.categories.splice(i, 1);
            }
        }

        this.req.current_user.expense.month.categories.push({
            date: this.bop,
            categories
        });

        await this.req.current_user.save();
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

    public async setDirty(req: Request, res: Response, next: NextFunction) {
        if (!req.expense) {
            throw new Error("An expense (req.expense) is required to set a report dirty");
        }

        let bop = req.expense.date;
        bop.setDate(1);
        bop.setHours(0, 0, 0, 0);

        for (let i = 0; i < req.current_user.expense.month.total.length; i++) {
            const total = req.current_user.expense.month.total[i];
            if (total.date.getTime() == bop.getTime()) {
                total.dirty = true;
            }
        }

        await req.current_user.save();

    }
}

const expenseReportMiddleware = new ExpenseReportMiddleware();
export default expenseReportMiddleware;