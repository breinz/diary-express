import { Router } from "express";

import listMiddleware from "../middleware/listMiddleware";
import listController from "../controller/listController";
import refererMiddleware from "../middleware/RefererMiddleware";

const router = Router();

router.use((req, res, next) => {
    res.locals.menuItem = "list";
    next();
});

router.get("/",
    listMiddleware.getLists,
    listController.getIndex
);

router.get("/new",
    refererMiddleware.save,
    listController.getNew
);

router.post("/new",
    listMiddleware.validNew,
    refererMiddleware.retrieve,
    listController.postNew
);

export default router;