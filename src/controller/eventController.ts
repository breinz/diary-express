import { Request, Response, NextFunction } from "express";
import Event from "../model/EventModel";

class EventController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("event/index", {
            events: req.events
        });
    }

    public getEvent(req: Request, res: Response, next: NextFunction) {
        res.render("event/event", {
            event: req.event
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

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("event/edit", {
            event: req.event
        });

    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.event, req.body);

        await req.event.save();

        req.flash("success", req.t("event.flash.edited"));

        res.redirect(req.referer)
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        req.event.deleted = true;

        await req.event.save();

        req.flash("success", req.t("event.flash.deleted"));

        res.json({ success: true, redirect: req.headers.referer });
    }
}

const eventController = new EventController();
export default eventController;