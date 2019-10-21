import { Request, Response, NextFunction } from "express";
import User from "../model/UserModel";

class SigninController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("signin/index");

        next();
    }

    public async postSignin(req: Request, res: Response, next: NextFunction) {
        await User.create(req.body);

        req.flash("success", req.t("user.flash.signed_in"))

        res.redirect("/");

        next();
    }

}

const signinController = new SigninController();
export default signinController;