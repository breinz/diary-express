import { Request, Response, NextFunction } from "express";
import ListValidator from "../validator/ListValidator";
import List, { ListModel } from "../model/ListModel";

class ListMiddleware {
    public async getLists(req: Request, res: Response, next: NextFunction) {
        req.lists = await List.find({ user: req.current_user }).sort("title") as ListModel[];

        next();
    }

    public async getList(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.list = await List.findById(req.params.id) as ListModel;
        } catch (error) {
            ok = false;
        }

        if (!ok) {
            req.flash("error", req.t("list.flash.error.not_found"));

            return res.redirect("/list");
        }

        next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new ListValidator(req.body);

        if (!validator.validNew()) {
            return res.render("list/new", {
                list: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new ListValidator(req.body);

        if (!validator.validEdit()) {
            return res.render("list/edit", {
                old: req.list,
                list: req.body,
                errors: validator.errors
            });
        }

        next();
    }
}

const listMiddleware = new ListMiddleware();
export default listMiddleware;