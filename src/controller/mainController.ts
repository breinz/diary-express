import { Request, Response, NextFunction } from "express";
import Page from "../model/PageModel";

class MainController {
    public async getIndex(req: Request, res: Response, next: NextFunction) {
        const page = await Page.findOne({ id: "index" });

        return res.render("index", {
            page: page
        });
    }
}

const mainController = new MainController();
export default mainController;