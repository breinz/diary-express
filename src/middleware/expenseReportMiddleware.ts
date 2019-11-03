import { Request, Response, NextFunction } from "express";
import Expense from "../model/ExpenseModel";
import ExpenseCategory, { ExpenseCategoryModel } from "../model/ExpenseCategoryModel";
import { UserModel } from "../model/UserModel";
import expenseMiddleware from "./expenseMiddleware";

class ExpenseReportMiddleware {

    private req: Request;

    private bop: Date;
    private eop: Date;

    public async getMonth(req: Request, res: Response, next: NextFunction) {
        expenseReportMiddleware.req = req;

        let [bop, eop] = expenseMiddleware.getPeriod(req);

        expenseReportMiddleware.bop = bop;
        expenseReportMiddleware.eop = eop;

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

        return <any>report;
    }

    private async getReport(): Promise<any> {

        let daysIn: number;
        let d = new Date();
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        if (d.getTime() == this.bop.getTime()) {
            daysIn = new Date().getDate();
        } else {
            d = this.eop;
            d.setDate(d.getDate() - 1);
            daysIn = d.getDate();
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
                                            $gte: ["$date", this.bop]
                                        },
                                        {
                                            $lte: ["$date", this.eop]
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

}

const expenseReportMiddleware = new ExpenseReportMiddleware();
export default expenseReportMiddleware;