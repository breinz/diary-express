import { Request, Response, NextFunction } from "express";
import ListValidator from "../validator/ListValidator";
import List, { ListModel } from "../model/ListModel";

class ListMiddleware {
    public async getLists(req: Request, res: Response, next: NextFunction) {
        req.lists = await List.find({ user: req.current_user }).sort("title") as ListModel[];

        next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new ListValidator(req.body);

        if (!validator.validNew()) {
            return res.render("list/new", {
                list: req.body,
                errors: validator.errors
            });
        }

        next();
    }
}

const listMiddleware = new ListMiddleware();
export default listMiddleware;