import { Router } from "express";

import userMiddleware from "../middleware/userMiddleware";
import journalController from "../controller/journalController";
import journalMiddleware from "../middleware/journalMiddleware";
import dateMiddleware from "../middleware/dateMiddleware";

const router = Router();

router.use(userMiddleware.adminShield);

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

export default router;