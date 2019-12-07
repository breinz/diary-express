import { Request, Response, NextFunction } from "express";
import Expense, { ExpenseModel } from "../model/ExpenseModel";
import People, { PeopleModel } from "../model/PeopleModel";
import Event, { EventModel } from "../model/EventModel";

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
                    user: req.current_user._id,
                    date: {
                        $gte: req.bop,
                        $lt: req.eop
                    }
                }
            }, {
                $lookup: {
                    from: 'expensecategories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            }, /*{
                $match: {
                    "category.0.user": req.current_user._id
                }
            }, */{
                $group: {
                    _id: "$date",
                    amount: {
                        $sum: "$amount"
                    }
                }
            }, {
                $project: {
                    amount: 1,
                    date: "$_id"
                }
            }
            // MONGO 4
            /*{
                $addFields: {
                    date: "$_id"
                }
            }*/
        ]);

        let people = await People.aggregate([
            {
                $match: {
                    user: req.current_user._id,
                    met_at: {
                        $gte: req.bop,
                        $lt: req.eop
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
                $project: {
                    firstName: 1,
                    date: "$_id"
                }
            }
            // MONGO 4
            /*,{
                $addFields: {
                    date: "$_id"
                }
            }*/
        ]);

        const events = await Event.aggregate([
            {
                $match: {
                    user: req.current_user._id,
                    date: {
                        $gte: req.bop,
                        $lt: req.eop
                    },
                    deleted: false
                }
            }, {
                $group: {
                    _id: "$date",
                    categories: {
                        $push: "$category"
                    }
                }
            }
            // MONGO 4
            /*{
                $addFields: {
                    total: {
                        $size: "$categories"
                    },
                    date: "$_id"
                }
            }*/, {
                $unwind: {
                    path: "$categories",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'eventcategories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            }, {
                $unwind: {
                    path: "$categories",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    categories: {
                        $push: "$categories"
                    },
                    total: {
                        $sum: 1
                    }
                }
            }, {
                $project: {
                    categories: 1,
                    total: 1,
                    /*total: {
                        $size: "$categories"
                    },*/
                    date: "$_id"
                }
            }
        ]);

        req.expenses = expenses;
        req.peoples = people;
        req.events = events;

        res.locals.journalData = {
            expenses,
            people,
            events
        }

        res.locals.month = req.params.month;
        res.locals.year = req.params.year;
        res.locals.day = req.params.day;

        next();
    }

    public async getDayElements(req: Request, res: Response, next: NextFunction) {

        /*const events = 

        const expenses = */

        const [events, expenses, peoples] = await Promise.all([
            Event.find({ user: req.current_user, date: req.bop, deleted: false }).populate("category"),
            Expense.find({ user: req.current_user, date: req.bop }).populate("category").sort("-amount"),
            People.find({ user: req.current_user, met_at: req.bop, deleted: false }).populate("from")
        ]);

        req.events = events as EventModel[];
        req.expenses = expenses as ExpenseModel[];
        req.peoples = peoples as PeopleModel[];

        res.locals.journalData = {
            expenses,
            peoples,
            events
        }

        res.locals.month = req.params.month;
        res.locals.year = req.params.year;
        res.locals.day = req.params.day;

        next();
    }
}

const journalMiddleware = new JournalMiddleware();
export default journalMiddleware;