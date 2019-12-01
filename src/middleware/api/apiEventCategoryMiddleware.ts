import { Request, Response, NextFunction } from "express";
import EventCategory, { EventCategoryModel } from "../../model/EventCategoryModel";
import { Types } from "mongoose";

class ApiEventCategoryMiddleware {

    public async getList(req: Request, res: Response, next: NextFunction) {

        req.eventCategories = await EventCategory.aggregate([
            {
                $match: {
                    user: req.current_user._id
                }
            }, {
                $lookup: {
                    from: 'events',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'events'
                }
            }

        ]) as EventCategoryModel[];


        // req.eventCategories = await EventCategory.find({ user: req.current_user._id }) as EventCategoryModel[];

        next();
    }

    public async getItem(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.eventCategory = await EventCategory.findById(req.query.id) as EventCategoryModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.eventCategory) {
            res.status(404).json({});
        }

        next();
    }

    public async getItemPopulated(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            const aggregate = await EventCategory.aggregate([{
                $match: {
                    _id: Types.ObjectId(req.query.id)
                }
            }, {
                $lookup: {
                    from: 'events',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'events'
                }
            }]);

            if (aggregate[0]) {
                req.eventCategory = aggregate[0];
            } else {
                ok = false;
            }

            //req.eventCategory = await EventCategory.findById(req.query.id) as EventCategoryModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.eventCategory) {
            res.status(404).json({});
        }

        next();
    }
}

const middleware = new ApiEventCategoryMiddleware();
export default middleware;