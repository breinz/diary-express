import { Router } from "express";
import userMiddleware from "../middleware/userMiddleware";
import journalController from "../controller/journalController";

const router = Router();

router.use(userMiddleware.adminShield);

router.get("/",
    journalController.getIndex
);

export default router;