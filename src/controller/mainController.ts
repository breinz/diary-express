import { Request, Response, NextFunction } from "express";

class MainController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        return res.render("index");
    }
}

const mainController = new MainController();
export default mainController;