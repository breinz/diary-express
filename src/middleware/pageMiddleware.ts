import { Request, Response, NextFunction } from "express";

import Page, { PageModel } from "../model/PageModel";
import PageValidator from "../validator/PageValidator";

class PageMiddleware {

    public async getPage(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.page = await Page.findById(req.params.id) as PageModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.page) {
            req.flash("error", req.t("page.flash.error.not_found"));

            return res.redirect("/page");
        }

        next();
    }

    public async getPages(req: Request, res: Response, next: NextFunction) {
        req.pages = await Page.find().sort("title") as PageModel[];

        next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new PageValidator(req.body);

        if (!validator.validNew()) {
            return res.render("page/new", {
                page: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new PageValidator(req.body);

        if (!validator.validEdit()) {
            return res.render("page/edit", {
                old: req.page,
                page: req.body,
                errors: validator.errors
            });
        }

        next();
    }
}

const pageMiddleware = new PageMiddleware();
export default pageMiddleware;