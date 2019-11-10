import { Request, Response, NextFunction } from "express";
import Event from "../model/EventModel";

class EventController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("event/index", {
            events: req.events
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("event/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await Event.create(req.body);

        req.flash("success", req.t("event.flash.created"));

        res.redirect(req.referer);
    }
}

const eventController = new EventController();
export default eventController;