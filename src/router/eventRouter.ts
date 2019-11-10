import { Router } from "express";

import eventCategoryRouter from "./eventCategoryRouter";
import eventController from "../controller/eventController";
import eventMiddleware from "../middleware/eventMiddleware";
import userMiddleware from "../middleware/userMiddleware";
import eventCategoryMiddleware from "../middleware/eventCategoryMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";

const router = Router();

router.use(userMiddleware.adminShield);

router.use((req, res, next) => {
    res.locals.menuItem = "event";
    next();
});

router.use("/category", eventCategoryRouter);

router.get("/",
    eventMiddleware.getEvents,
    eventController.getIndex
);

router.get("/new",
    refererMiddleware.save,
    eventCategoryMiddleware.getForSelect,
    eventController.getNew
);

router.post("/new",
    eventMiddleware.validNew,
    refererMiddleware.retrieve,
    eventController.postNew
);

export default router;