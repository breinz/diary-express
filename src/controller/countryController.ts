import { Request, Response, NextFunction } from "express";
import Country, { CountryModel } from "../model/CountryModel";

class CountryController {
    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("country/index", {
            countries: req.countries
        });
    }

    public getNew(req: Request, res: Response, next: NextFunction) {
        res.render("country/new");
    }

    public async postNew(req: Request, res: Response, next: NextFunction) {
        req.body.user = req.current_user;

        req.country = await Country.create(req.body) as CountryModel;

        if (req.cookies.step_country) {
            res.cookie("step_country", Object.assign(req.cookies.step_country, { country: req.country }));
            res.redirect(req.cookies.step_country.referer);
        } else {

            req.flash("success", req.t("country.flash.created"));

            res.redirect("/country");
        }
    }

    public getEdit(req: Request, res: Response, next: NextFunction) {
        res.render("country/edit", {
            country: req.country,
            cache: false
        });
    }

    public async postEdit(req: Request, res: Response, next: NextFunction) {
        Object.assign(req.country, req.body);

        await req.country.save();

        req.flash("success", req.t("country.flash.edited"));

        res.redirect("/country");
    }

    public async deleteDelete(req: Request, res: Response, next: NextFunction) {

        await Country.deleteOne({ _id: req.country._id });

        req.flash("success", req.t("country.flash.deleted"));

        res.json({ success: true, redirect: "/country" });
    }
}

const countryController = new CountryController();
export default countryController;