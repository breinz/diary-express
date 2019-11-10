import { Router } from "express";

import userMiddleware from "../middleware/userMiddleware";
import journalController from "../controller/journalController";
import journalMiddleware from "../middleware/journalMiddleware";
import dateMiddleware from "../middleware/dateMiddleware";

const router = Router();

router.use(userMiddleware.adminShield);

router.use((req, res, next) => {
    res.locals.menuItem = "journal";
    next();
});

router.get("/",
    dateMiddleware.getPeriod,
    journalMiddleware.getElements,
    journalController.getIndex
);

router.get("/:year(\\d{4})-:month(\\d{1,2})/",
    journalMiddleware.validMonth,
    dateMiddleware.getPeriod,
    journalMiddleware.getElements,
    journalController.getIndex
);

router.get("/:year(\\d{4})-:month(\\d{1,2})-:day(\\d{1,2})/",
    journalController.getDay
);

export default router;