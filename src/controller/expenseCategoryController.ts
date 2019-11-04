import { Request, Response, NextFunction } from "express";
import ExpenseCategory from "../model/ExpenseCategoryModel";

class ExpenseCategoryController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("expense/category/index", {
            categories: req.expenseCategories
        });
    }

    public getCategory(req: Request, res: Response, next: NextFunction) {
        res.render("expense/category/category", {
            category: req.expenseCategory
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("expense/category/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await ExpenseCategory.create(req.body);

        req.flash("success", req.t("expenseCategory.flash.created"));

        res.redirect("/expense/category");
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("expense/category/edit", {
            category: req.expenseCategory,
            cache: false
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.expenseCategory, req.body);

        await req.expenseCategory.save()

        req.flash("success", req.t("expenseCategory.flash.edited"));

        res.redirect(req.referer);
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {
        req.expenseCategory.deleted = true;

        await req.expenseCategory.save();

        req.flash("success", req.t("expenseCategory.flash.deleted"));

        res.json({ success: true, redirect: req.headers.referer });
    }

    public async getRecover(req: Request, res: Response, next: NextFunction) {
        req.expenseCategory.deleted = false;

        await req.expenseCategory.save();

        req.flash("success", req.t("expenseCategory.flash.recovered"));

        res.redirect(req.headers.referer);
    }

    public async deleteRemove(req: Request, res: Response, next: NextFunction) {
        await ExpenseCategory.deleteOne({ _id: req.expenseCategory._id })

        req.flash("success", req.t("expenseCategory.flash.removed"));

        res.json({ success: true, redirect: "/expense/category" });
    }


}

const expenseCategoryController = new ExpenseCategoryController();
export default expenseCategoryController;