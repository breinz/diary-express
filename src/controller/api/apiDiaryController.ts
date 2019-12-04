import { Request, Response, NextFunction } from "express";

class ApiDiaryController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.json({
            expenses: req.expenses,
            people: req.peoples,
            events: req.events
        });
    }

    public getDay(req: Request, res: Response, next: NextFunction) {
        res.json({
            expenses: req.expenses,
            people: req.peoples,
            events: req.events
        });
    }
}

const controller = new ApiDiaryController();
export default controller;