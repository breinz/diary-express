import { Request, Response, NextFunction } from "express";
import Expense from "../model/ExpenseModel";
import People from "../model/PeopleModel";

class JournalMiddleware {

    public validMonth(req: Request, res: Response, next: NextFunction) {
        if (req.params.month && req.params.year) {
            const month = parseInt(req.params.month);
            const year = parseInt(req.params.year);
            if (month <= 0) {
                return res.redirect(`/journal/${year - 1}-12`);
            }
            if (month >= 13) {
                return res.redirect(`/journal/${year + 1}-1`);
            }
        }
        next();
    }

    public async getElements(req: Request, res: Response, next: NextFunction) {
        let expenses = await Expense.aggregate([
            {
                $match: {
                    date: {
                        $gte: req.bop,
                        $lte: req.eop
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
                $match: {
                    "category.0.user": req.current_user._id
                }
            }, {
                $group: {
                    _id: "$date",
                    amount: {
                        $sum: "$amount"
                    }
                }
            }, {
                $addFields: {
                    date: "$_id"
                }
            }
        ]);

        let people = await People.aggregate([
            {
                $match: {
                    user: req.current_user._id,
                    met_at: {
                        $gte: req.bop,
                        $lte: req.eop
                    }
                }
            }, {
                $group: {
                    _id: "$met_at",
                    firstName: {
                        $addToSet: "$firstName"
                    }
                }
            }, {
                $addFields: {
                    date: "$_id"
                }
            }
        ]);

        res.locals.journalData = {
            expenses,
            people
        }

        res.locals.month = req.params.month;
        res.locals.year = req.params.year;

        next();
    }
}

const journalMiddleware = new JournalMiddleware();
export default journalMiddleware;