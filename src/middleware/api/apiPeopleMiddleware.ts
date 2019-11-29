import { Request, Response, NextFunction } from "express";
import PeopleValidator from "../../validator/PeopleValidator";
import People, { PeopleModel } from "../../model/PeopleModel";

class ApiPeopleMiddleware {

    public async getList(req: Request, res: Response, next: NextFunction) {
        req.peoples = await People.find({ user: req.current_user }).sort("firstName").populate("from") as PeopleModel[];
        next();
    }

    public async getPeople(req: Request, res: Response, next: NextFunction) {
        try {
            req.people = await People.findById(req.query.id) as PeopleModel;
        } catch (error) {
            return res.status(404).json({});
        }
        next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new PeopleValidator(req.body);

        if (!validator.validNew()) {
            return res.status(400).json({ errors: validator.errors });
        }

        next();
    }
}

const apiPeopleMiddleware = new ApiPeopleMiddleware();
export default apiPeopleMiddleware;