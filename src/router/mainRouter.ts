import { Router } from "express";

import mainController from "../controller/mainController";
import loginRouter from "./loginRouter";
import logoutRouter from "./logoutRouter";
import signinRouter from "./signinRouter";
import expenseRouter from "./expenseRouter";
import peopleRouter from "./peopleRouter";
import countryRouter from "./countryRouter";
import pageRouter from "./pageRouter";

const router = Router();

router.get("/",
    mainController.getIndex
);

router.use("/signin", signinRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

router.use("/page", pageRouter);
router.use("/expense", expenseRouter);
router.use("/people", peopleRouter);
router.use("/country", countryRouter);

export default router;