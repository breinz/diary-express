import { Request, Response, NextFunction } from "express";
import EventCategory, { EventCategoryModel } from "../../model/EventCategoryModel";

class ApiEventCategoryController {
    public async post(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        req.eventCategory = await EventCategory.create(req.body) as EventCategoryModel;

        res.json({ ok: true, id: req.eventCategory._id });
    }

    public getList(req: Request, res: Response, next: NextFunction) {
        res.json(req.eventCategories);
    }

    public getItem(req: Request, res: Response, next: NextFunction) {
        res.json(req.eventCategory);
    }

    public async patch(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.eventCategory, req.body);

        await req.eventCategory.save();

        res.json({ ok: true });
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        await req.eventCategory.remove();

        res.json({ ok: true });
    }
}

const controller = new ApiEventCategoryController();
export default controller;