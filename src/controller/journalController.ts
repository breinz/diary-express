import { Request, Response, NextFunction } from "express";

class JournalController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("journal/index");
    }
}

const journalController = new JournalController();
export default journalController;