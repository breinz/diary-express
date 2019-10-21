import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    if (req.current_user) {

        req.current_user.session = null;

        await req.current_user.save();
    }

    req.flash("success", req.t("user.flash.logged_out"));

    res.redirect("/");
});

export default router;