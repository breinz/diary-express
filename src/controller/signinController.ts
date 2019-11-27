import { Request, Response, NextFunction } from "express";
import User, { UserModel } from "../model/UserModel";

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

    public async apiPostSignin(req: Request, res: Response, next: NextFunction) {

        const user = await User.create(req.body) as UserModel;

        user.apiLogin();

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: user.api.token,
            expireAt: user.api.expireAt
        });
    }

}

const signinController = new SigninController();
export default signinController;