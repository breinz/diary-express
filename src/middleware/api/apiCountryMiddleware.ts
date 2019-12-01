import { Request, Response, NextFunction } from "express";
import Country, { CountryModel } from "../../model/CountryModel";

class ApiCountryMiddleware {
    public async getCountries(req: Request, res: Response, next: NextFunction) {
        req.countries = await Country.aggregate([
            {
                $match: {
                    user: req.current_user._id
                }
            }, {
                $lookup: {
                    from: 'peoples',
                    localField: '_id',
                    foreignField: 'from',
                    as: 'peoples'
                }
            }, {
                $sort: {
                    name: 1
                }
            }
        ]) as CountryModel[];

        //req.countries = await Country.find({ user: req.current_user }).sort("name") as CountryModel[];

        next();
    }

    public async getCountry(req: Request, res: Response, next: NextFunction) {

        let ok = true;
        try {
            req.country = await Country.findById(req.query.id) as CountryModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.country) {
            return res.status(404).json({ error: "not_found" });
        }

        next();
    }
}

const middleware = new ApiCountryMiddleware();
export default middleware;