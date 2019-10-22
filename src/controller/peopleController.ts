import { Request, Response, NextFunction } from "express";

class PeopleController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("people/index");
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("people/new");
    }
}

const peopleController = new PeopleController();
export default peopleController;