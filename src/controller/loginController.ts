import { Request, Response, NextFunction } from "express";
import uniqid from "uniqid";

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

}

const loginController = new LoginController();
export default loginController;