import { Request, Response, NextFunction } from "express";
import EventCategory, { EventCategoryModel } from "../model/EventCategoryModel";
import EventCategoryValidator from "../validator/EventCategoryValidator";

class EventCategoryMiddleware {

    public async getCategories(req: Request, res: Response, next: NextFunction) {
        req.eventCategories = await EventCategory.find({ user: req.current_user, deleted: false }).sort("name") as EventCategoryModel[];

        next();
    }

    public async getCategory(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.eventCategory = await EventCategory.findById(req.params.id) as EventCategoryModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.eventCategory) {
            req.flash("error", req.t("eventCategory.flash.error.not_found"));
            return res.redirect("/event/category");
        }

        next();
    }

    public async getForSelect(req: Request, res: Response, next?: NextFunction) {
        req.eventCategories = await EventCategory.find({ user: req.current_user, deleted: false }).sort("name") as EventCategoryModel[];

        res.locals.categories = req.eventCategories;

        if (next) next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new EventCategoryValidator(req.body);

        if (!validator.validNew()) {
            return res.render("event/category/new", {
                category: req.body,
                errors: validator.errors
            });
        }
        next();
    }

    public validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new EventCategoryValidator(req.body);

        if (!validator.validEdit()) {
            return res.render("event/category/edit", {
                category: req.body,
                old: req.eventCategory,
                errors: validator.errors
            });
        }
        next();
    }
}

const eventCategoryMiddleware = new EventCategoryMiddleware();
export default eventCategoryMiddleware;