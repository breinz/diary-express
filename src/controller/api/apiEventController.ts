import { Request, Response, NextFunction } from "express";
import Event, { EventModel } from "../../model/EventModel";

class ApiEventController {

    public getList(req: Request, res: Response, next: NextFunction) {
        res.json(req.events);
    }

    public getEvent(req: Request, res: Response, next: NextFunction) {
        res.json(req.event);
    }

    public async post(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user._id;

        req.event = await Event.create(req.body) as EventModel;

        res.json({});
    }

    public async patch(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.event, req.body);

        await req.event.save();

        res.json({});
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        await req.event.remove();

        res.json({});
    }
}

const controller = new ApiEventController();
export default controller;