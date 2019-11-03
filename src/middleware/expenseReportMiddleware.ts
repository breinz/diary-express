import { Request, Response, NextFunction } from "express";
import Expense from "../model/ExpenseModel";
import ExpenseCategory, { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { UserModel } from "../model/UserModel";
import expenseMiddleware from "./expenseMiddleware";

class ExpenseReportMiddleware {

    private req: Request;


    public async getMonth(req: Request, res: Response, next: NextFunction) {
        expenseReportMiddleware.req = req;

        let [total, categories, reports] = await Promise.all([
            expenseReportMiddleware.getTotal(),
            expenseReportMiddleware.getCategories(),
            expenseReportMiddleware.getReport()
        ]);

        req.expenseReport = {
            total,
            categories,
            reports
        };

        next();

    }

    public async getYear(req: Request, res: Response, next: NextFunction) {
        expenseReportMiddleware.req = req;

        let [total, categories, reports] = await Promise.all([
            expenseReportMiddleware.getTotal(),
            expenseReportMiddleware.getCategories(),
            expenseReportMiddleware.getReport()
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

        let total_query = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: this.req.bop,
                        $lt: this.req.eop
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

        let total = 0;
        if (total_query[0]) {
            total = total_query[0].total;
        }

        return total;
    }

    private async getCategories(): Promise<[{ total: number, category: ExpenseCategoryModel }]> {

        const report = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: this.req.bop,
                        $lte: this.req.eop
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

    private async getReport(): Promise<any> {

        let daysIn: number;

        if (this.req.params.year) {

            if (this.req.params.month) {

                let d = new Date();
                d.setDate(1);
                d.setHours(0, 0, 0, 0);

                // Day in month (1-31)
                if (d.getTime() == this.req.bop.getTime()) {
                    // Current month (getDate)
                    daysIn = new Date().getDate();
                } else {
                    // Not current month (how many days in this month)
                    d = this.req.eop;
                    d.setDate(d.getDate() - 1);
                    daysIn = d.getDate();
                }
            } else {
                // Day in year (1-366)
                let now = new Date();
                let start = new Date(now.getFullYear(), 0, 0);
                let diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                let oneDay = 1000 * 60 * 60 * 24;
                daysIn = Math.floor(diff / oneDay);
            }
        }

        const report = await ExpenseCategory.aggregate([
            {
                $match: {
                    "report.active": true,
                    "user": this.req.current_user._id
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
                                            $gte: ["$date", this.req.bop]
                                        },
                                        {
                                            $lte: ["$date", this.req.eop]
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
                                        then: daysIn,
                                        else: 20 // TODO: Report not by day
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

const expenseReportMiddleware = new ExpenseReportMiddleware();
export default expenseReportMiddleware;