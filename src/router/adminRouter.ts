import { Router } from "express";

import userMiddleware from "../middleware/userMiddleware";
import adminController from "../controller/adminController";

const router = Router();

router.use(userMiddleware.adminShield);

router.get("/",
    adminController.getIndex
);

export default router;