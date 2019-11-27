import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

//import UserValidator from "../validator/UserValidator";
import User, { UserModel } from "../model/UserModel";
import UserValidator from "../validator/UserValidator";

class UserMiddleware {

    public async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        if (req.cookies && req.cookies.session) {

            // get the cookie
            const cookie: string = req.cookies.session;

            // extract user's id
            const id = cookie.substr(0, cookie.indexOf('%'));

            // Find the user
            let user: UserModel;
            try {
                user = await User.findById(id) as UserModel;
            } catch (error) {
                return next()
            }

            if (!user || !user.session) {
                return next();
            }

            // extract the session
            const session = cookie.substr(cookie.indexOf('%') + 1);

            // compare wih the session stored 
            if (!await bcrypt.compare(session, user.session)) {
                return next();
            }

            res.locals.current_user = user;
            req.current_user = user;
        }

        next();
    }

    /*public async findByEmail(req: Request, res: Response, next: NextFunction) {
        req.user = await User.findOne({ email: req.body.email }) as UserModel;

        if (!req.user) {
            res.redirect("/");
        }

        next();
    }

    public async findByPasswordRecoverToken(req: Request, res: Response, next: NextFunction) {
        let user: UserModel;

        // Find the user
        try {
            user = await User.findById(req.params.id) as UserModel;
        } catch (error) {
            return res.redirect("/");
        }

        // Check if the token has expired
        const at = user.token.password_reset_at;
        at.setHours(at.getHours() + 1);
        if (new Date() > at) {
            return res.redirect('/');
        }

        // Check if the token is correct
        if (!await bcrypt.compare(req.params.token, user.token.password_reset)) {
            return res.redirect("/");
        }

        req.user = user;

        next();
    }*/

    public adminShield(req: Request, res: Response, next: NextFunction) {

        if (!req.current_user) {
            req.flash("error", req.t("user.error.login_required"));

            return res.redirect("/login");
        }

        if (!req.current_user || !req.current_user.admin) {
            req.flash("error", req.t("user.error.admin_required"));

            return res.redirect("/")
        }

        next();
    }

    public loginShield(req: Request, res: Response, next: NextFunction) {
        if (!req.current_user) {
            req.flash("error", req.t("user.error.login_required"));

            return res.redirect("/login");
        }

        next();
    }

    public async validSignin(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!await validator.validSignin()) {

            return res.render("signin/index", {
                data: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public async apiValidSignin(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!await validator.validSignin()) {
            return res.status(400).json({ errors: validator.errors });
        }

        next();
    }

    /*public async getBySigninToken(req: Request, res: Response, next: NextFunction) {
        req.user = await User.findOne({ "token.signin": req.params.token }) as UserModel;

        if (!req.user) {
            return res.redirect("/");
        }

        next();
    }

    public async getByLoginToken(req: Request, res: Response, next: NextFunction) {
        req.user = await User.findOne({ "token.login": req.params.token }) as UserModel;

        if (!req.user) {
            return res.redirect("/");
        }

        next();
    }*/

    public async validLogin(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!validator.validLogin()) {
            return res.render("login/login", {
                user: req.body,
                errors: validator.errors
            });
        }

        const user = await User.findOne({ email: req.body.email }) as UserModel;

        if (!user) {
            return res.render("login/login", {
                user: req.body,
                errors: {
                    email: "not_found"
                }
            });
        }

        if (!await user.validatePassword(req.body.password)) {
            return res.render("login/login", {
                user: req.body,
                errors: {
                    password: "unvalid"
                }
            });
        }

        req.user = user;

        next();
    }

    public async apiValidLogin(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!validator.validLogin()) {
            return res.status(400).json({ error: true });
        }

        const user = await User.findOne({ email: req.body.email }) as UserModel;

        if (!user) {
            return res.status(400).json({ error: true });
        }

        if (!await user.validatePassword(req.body.password)) {
            return res.status(400).json({ error: true });
        }

        req.user = user;

        next();
    }

    public async apiLogin(req: Request, res: Response, next: NextFunction) {

    }

    public async apiFindUser(req: Request, res: Response, next: NextFunction) {
        let ok = true;
        try {
            req.current_user = await User.findById(req.query.uid) as UserModel;
        } catch (error) {
            ok = false;
        }

        if (!ok || !req.current_user) {
            return res.status(401).json({ error: "INVALID_USER" });
        }

        next();
    }

    public tokenShield(req: Request, res: Response, next: NextFunction) {
        if (!req.query.token || req.query.token !== req.current_user.api.token) {
            return res.status(401).json({ error: "invalid token" });
        }

        next();
    }

    /*public async validRecoverPassword(req: Request, res: Response, next: NextFunction) {
        const validator = new UserValidator(req.body);

        if (!await validator.validRecoverPassword()) {
            return res.render("password/recover", {
                user: req.body,
                errors: validator.errors
            });
        }

        next();
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            req.user = await User.findById(req.params.id) as UserModel;
        } catch (error) {
            req.flash("error", "User not found");

            return res.redirect(req.headers.referer);
        }

        if (!req.user) {
            req.flash("error", "User not found");

            return res.redirect(req.headers.referer);
        }

        next();
    }*/
}

export default new UserMiddleware();