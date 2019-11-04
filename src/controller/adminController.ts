import { Request, Response, NextFunction } from "express";

class AdminController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("admin/index");
    }
}

const adminController = new AdminController();
export default adminController;