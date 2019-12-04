import { Router } from "express";
import apiDateMiddleware from "../../middleware/api/apiDateMiddleware";
import journalMiddleware from "../../middleware/journalMiddleware";
import apiDiaryController from "../../controller/api/apiDiaryController";
import userMiddleware from "../../middleware/userMiddleware";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.get("/",
    apiDateMiddleware.getPeriod,
    journalMiddleware.getElements,
    apiDiaryController.getIndex
);

router.get("/day",
    apiDateMiddleware.getPeriod,
    journalMiddleware.getDayElements,
    apiDiaryController.getDay
);

export default router;