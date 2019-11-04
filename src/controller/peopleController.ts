import { Request, Response, NextFunction } from "express";
import People from "../model/PeopleModel";

class PeopleController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("people/index", {
            peoples: req.peoples
        });
    }

    public getPeople(req: Request, res: Response, next: NextFunction) {
        res.render("people/people", {
            people: req.people
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("people/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await People.create(req.body);

        req.flash("success", req.t("people.flash.created"));

        res.redirect("/people");
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("people/edit", {
            people: req.people,
            cache: false
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.people, req.body);

        await req.people.save();

        req.flash("success", req.t("people.flash.edited"));

        res.redirect(req.referer);
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        req.people.deleted = true;

        await req.people.save();

        req.flash("success", req.t("people.flash.deleted"));

        res.json({ success: true, redirect: req.headers.referer });
    }

    public async getRecover(req: Request, res: Response, next: NextFunction) {
        req.people.deleted = false;

        await req.people.save();

        req.flash("success", req.t("people.flash.recovered"));

        res.redirect(req.headers.referer);
    }

    public async deleteRemove(req: Request, res: Response, next: NextFunction) {
        await People.deleteOne({ _id: req.people._id });

        req.flash("success", req.t("people.flash.removed"));

        res.json({ success: true, redirect: "/people" });
    }

}

const peopleController = new PeopleController();
export default peopleController;