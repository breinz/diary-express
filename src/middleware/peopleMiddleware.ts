import { Request, Response, NextFunction } from "express";

import PeopleValidator from "../validator/PeopleValidator";
import countryMiddleware from "./countryMiddleware";
import People, { PeopleModel } from "../model/PeopleModel";
import FormHelper from "../helper/FormHelper";

class PeopleMiddleware {

    public async getPeoples(req: Request, res: Response, next: NextFunction) {
        req.peoples = await People.find({ user: req.current_user, deleted: false }).sort("firstName").populate("from") as PeopleModel[];
        next();
    }

    public async getPeople(req: Request, res: Response, next: NextFunction) {
        let ok = true;

        try {
            req.people = await People.findById(req.params.id).populate("from") as PeopleModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.people) {
            req.flash("error", req.t("people.flash.error.not_found"));

            return res.redirect("/people");
        }

        res.locals.people = req.people;

        next();

    }

    public initForm(req: Request, res: Response, next: NextFunction) {
        res.locals.people = {};

        const formHelper = new FormHelper(req.query, res.locals.people);

        formHelper.extractDate("met_at");

        next();
    }

    public async validNew(req: Request, res: Response, next: NextFunction) {
        const validator = new PeopleValidator(req.body);

        if (!validator.validNew()) {

            await countryMiddleware.getForSelect(req, res);

            return res.render("people/new", {
                people: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public async validEdit(req: Request, res: Response, next: NextFunction) {
        const validator = new PeopleValidator(req.body);

        if (!validator.validEdit()) {

            await countryMiddleware.getForSelect(req, res);

            return res.render("people/edit", {
                people: req.body,
                old: req.people,
                errors: validator.errors
            });
        }

        next();
    }
}

const peopleMiddleware = new PeopleMiddleware();
export default peopleMiddleware;