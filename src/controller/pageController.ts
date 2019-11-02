import { Request, Response, NextFunction } from "express";
import Page from "../model/PageModel";

class PageController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("page/index", {
            pages: req.pages
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("page/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        await Page.create(req.body);

        req.flash("success", req.t("page.flash.created"));

        res.redirect("/page");
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("page/edit", {
            page: req.page
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.page, req.body);

        await req.page.save();

        req.flash("success", req.t("page.flash.edited"));

        res.redirect(req.referer);
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        await Page.deleteOne({ _id: req.page._id });

        req.flash("success", req.t("page.flash.deleted"));

        res.json({ success: true, redirect: req.headers.referer });
    }
}

const pageController = new PageController();
export default pageController;