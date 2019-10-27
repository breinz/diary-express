import { Request, Response, NextFunction } from "express";

import Country, { CountryModel } from "../model/CountryModel";
import CountryValidator from "../validator/CountryValidator";

class CountrMiddleware {
    public async getCountries(req: Request, res: Response, next: NextFunction) {
        req.countries = await Country.find().sort("name") as CountryModel[];

        next();
    }

    public async getCountry(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.country = await Country.findById(req.params.id) as CountryModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.country) {
            req.flash("error", req.t("country.flash.error.not-found"));

            return res.redirect("/country");
        }
        next();
    }

    public async getForSelect(req: Request, res: Response, next?: NextFunction) {
        res.locals.countries = await Country.find().sort("name");

        if (next) next();
    }

    public validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new CountryValidator(req.body);

        if (!validator.validNew()) {
            return res.render("country/new", {
                country: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new CountryValidator(req.body);

        if (!validator.validEdit()) {
            return res.render("country/edit", {
                old: req.country,
                country: req.body,
                errors: validator.errors
            });
        }

        next();
    }
}

const countryMiddleware = new CountrMiddleware();
export default countryMiddleware;