import { Request, Response, NextFunction } from "express";
import Country from "../../model/CountryModel";

class ApiCountryController {
    public getCountries(req: Request, res: Response, next: NextFunction) {
        res.json(req.countries);
    }

    public async post(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        await Country.create(req.body);

        res.json({ ok: true });
    }

    public async patch(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.country, req.body);

        await req.country.save();

        res.json({ ok: true });
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        await Country.deleteOne({ _id: req.country._id });

        res.json({ ok: true });
    }
}

const controller = new ApiCountryController();
export default controller;