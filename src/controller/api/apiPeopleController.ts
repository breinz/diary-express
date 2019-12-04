import { Request, Response, NextFunction } from "express";
import People from "../../model/PeopleModel";

class ApiPeopleController {

    public getList(req: Request, res: Response, next: NextFunction) {
        res.json(req.peoples);
    }

    public getPeople(req: Request, res: Response, next: NextFunction) {
        res.json(req.people);
    }

    public async post(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await People.create(req.body);

        res.json({ ok: true });
    }

    public async patch(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.people, req.body);

        await req.people.save();

        res.json({ ok: true });
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        await req.people.remove();

        // req.people.deleted = true;

        // await req.people.save();

        res.json({});
    }
}

const apiPeopleController = new ApiPeopleController();
export default apiPeopleController;