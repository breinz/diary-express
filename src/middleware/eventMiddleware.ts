import { Request, Response, NextFunction } from "express";
import Event, { EventModel } from "../model/EventModel";
import eventCategoryMiddleware from "./eventCategoryMiddleware";
import EventValidator from "../validator/EventValidator";

class EventMiddleware {

    public async getEvents(req: Request, res: Response, next: NextFunction) {
        req.events = await Event.find({ user: req.current_user, deleted: false }).sort("date").populate("category") as EventModel[];

        next();
    }

    public async getEvent(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.event = await Event.findById(req.params.id).populate("category") as EventModel;
        } catch (error) {
            ok = false;
        }

        if (!ok) {
            req.flash("error", req.t("event.flash.error.not_found"));

            return res.redirect("/event");
        }

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

    public async validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new EventValidator(req.body);

        if (!validator.validEdit()) {
            await eventCategoryMiddleware.getForSelect(req, res);

            return res.render("event/edit", {
                event: req.body,
                errors: validator.errors
            });
        }

        next();
    }
}

const eventMiddleware = new EventMiddleware();
export default eventMiddleware;