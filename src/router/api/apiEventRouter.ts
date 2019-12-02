import { Router } from "express";

import apiEventCategoryRouter from "./apiEventCategoryRouter";
import userMiddleware from "../../middleware/userMiddleware";
import apiEventMiddleware from "../../middleware/api/apiEventMiddleware";
import apiEventController from "../../controller/api/apiEventController";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.use("/category", apiEventCategoryRouter);

router.get('/',
    apiEventMiddleware.getList,
    apiEventController.getList
);

router.get('/event',
    apiEventMiddleware.getEvent,
    apiEventController.getEvent
);

router.post("/",
    // validator
    apiEventController.post
);

router.patch("/",
    apiEventMiddleware.getEvent,
    apiEventController.patch
);

router.delete("/",
    apiEventMiddleware.getEvent,
    apiEventController.delete
);



export default router;