import { Request, Response, NextFunction } from "express";
import List from "../model/ListModel";

class ListController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("list/index", {
            lists: req.lists
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("list/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await List.create(req.body);

        req.flash("success", req.t("list.flash.created"));

        res.redirect(req.referer);
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("list/edit", {
            list: req.list
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.list, req.body);

        await req.list.save();

        req.flash("success", req.t("list.flash.edited"));

        res.redirect(req.referer);
    }
}

const listController = new ListController();
export default listController;