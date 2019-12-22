import { Request, Response, NextFunction } from "express";
import ExpenseCategory from "../../model/ExpenseCategoryModel";

class ApiExpenseCategoryController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.json({ categories: req.expenseCategories });
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        const cat = await ExpenseCategory.create(req.body);

        res.json({ success: true, id: cat._id });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.expenseCategory, req.body);

        await req.expenseCategory.save()

        res.json({ success: true });
    }

    public async patchDelete(req: Request, res: Response, next: NextFunction) {
        req.expenseCategory.deleted = true;

        await req.expenseCategory.save();

        res.json({ success: true });
    }

    public async patchRecover(req: Request, res: Response, next: NextFunction) {
        req.expenseCategory.deleted = false;

        await req.expenseCategory.save();

        res.json({ success: true });
    }

    public async deleteRemove(req: Request, res: Response, next: NextFunction) {
        await ExpenseCategory.deleteOne({ _id: req.expenseCategory._id })

        res.json({ success: true });
    }
}

const apiExpenseCategoryController = new ApiExpenseCategoryController();
export default apiExpenseCategoryController;