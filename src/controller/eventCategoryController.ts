import { Request, Response, NextFunction } from "express";
import EventCategory from "../model/EventCategoryModel";

class EventCategoryController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("event/category/index", {
            categories: req.eventCategories
        });
    }

    public getCategory(req: Request, res: Response, next: NextFunction) {
        res.render("event/category/category", {
            category: req.eventCategory
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("event/category/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await EventCategory.create(req.body);

        req.flash("success", req.t("eventCategory.flash.created"));

        res.redirect("/event/category");
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("event/category/edit", {
            category: req.eventCategory
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.eventCategory, req.body);

        await req.eventCategory.save();

        req.flash("success", req.t("eventCategory.flash.edited"));

        res.redirect(req.referer);
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        req.eventCategory.deleted = true;

        await req.eventCategory.save();

        req.flash("success", req.t("eventCategory.flash.deleted"));

        res.json({ success: true, redirect: req.headers.referer });
    }

    public async getRecover(req: Request, res: Response, next: NextFunction) {
        req.eventCategory.deleted = false;

        await req.eventCategory.save();

        req.flash("success", req.t("eventCategory.flash.recovered"));

        res.redirect(req.headers.referer);
    }

    public async deleteRemove(req: Request, res: Response, next: NextFunction) {
        await EventCategory.deleteOne({ _id: req.eventCategory._id });

        req.flash("success", req.t("eventCategory.flash.removed"));

        res.json({ success: true, redirect: "/event/category" });
    }
}

const eventCategoryController = new EventCategoryController();
export default eventCategoryController;