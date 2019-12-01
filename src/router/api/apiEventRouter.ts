import { Router } from "express";

import apiEventCategoryRouter from "./apiEventCategoryRouter";
import userMiddleware from "../../middleware/userMiddleware";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.use("/category", apiEventCategoryRouter);



export default router;