import { Request, Response, NextFunction } from "express";
import Event, { EventModel } from "../model/EventModel";
import eventCategoryMiddleware from "./eventCategoryMiddleware";
import EventValidator from "../validator/EventValidator";

class EventMiddleware {

    public async getEvents(req: Request, res: Response, next: NextFunction) {
        req.events = await Event.find({ user: req.current_user }).sort("date").populate("category") as EventModel[];

        next();
    }

    public async validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new EventValidator(req.body);

        if (!validator.validNew()) {
            await eventCategoryMiddleware.getForSelect(req, res);

            return res.render("event/new", {
                event: req.body,
                errors: validator.errors
            });
        }

        next();
    }
}

const eventMiddleware = new EventMiddleware();
export default eventMiddleware;