import { Request, Response, NextFunction } from "express";
import uniqid from "uniqid";
import User from "../model/UserModel";

class LoginController {

    public getIndex(req: Request, res: Response, next: NextFunction) {
        res.render("login/index");

        next();
    }

    public async postLogin(req: Request, res: Response, next: NextFunction) {
        const session = uniqid();

        req.user.session = session;

        await req.user.save();

        res.cookie("session", req.user.id + "%" + session, { maxAge: 1000 * 60 * 60 * 24 * 30 });

        req.flash("success", req.t("user.flash.logged_in"));

        res.redirect("/")
    }

    public async apiPostLogin(req: Request, res: Response, next: NextFunction) {

        req.user.apiLogin();

        res.json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            token: req.user.api.token,
            expireAt: req.user.api.expireAt,
            lang: req.user.lang
        });
    }

}

const loginController = new LoginController();
export default loginController;