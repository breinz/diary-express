import { Request, Response, NextFunction } from "express";
import Event, { EventModel } from "../../model/EventModel";

class ApiEventMiddleware {

    public async getList(req: Request, res: Response, next: NextFunction) {
        req.events = await Event.find({ user: req.current_user._id }).sort("title").populate('category') as EventModel[];

        next();
    }

    public async getEvent(req: Request, res: Response, next: NextFunction) {
        let db_req = Event.findById(req.query.id);
        if (req.query.populated === "1") db_req.populate("category");

        let ok = true;
        try {
            req.event = await db_req as EventModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.event) {
            return res.status(404).json({});
        }

        next();
    }
}

const middleware = new ApiEventMiddleware();
export default middleware;