import { Router } from "express";

import pageController from "../controller/pageController";
import pageMiddleware from "../middleware/pageMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";
import userMiddleware from "../middleware/userMiddleware";

const router = Router();

router.use(userMiddleware.adminShield);

router.use((req, res, next) => {
    res.locals.menuItem = "page";
    next();
});

router.get("/",
    pageMiddleware.getPages,
    pageController.getIndex
);

router.get("/new",
    pageController.getNew
);

router.post("/new",
    pageMiddleware.validNew,
    pageController.postNew
);

router.get("/:id/edit",
    pageMiddleware.getPage,
    refererMiddleware.save,
    pageController.getEdit
);

router.post("/:id/edit",
    pageMiddleware.getPage,
    pageMiddleware.validEdit,
    refererMiddleware.retrieve,
    pageController.postEdit
);

router.delete("/:id/delete",
    pageMiddleware.getPage,
    pageController.deleteDelete
);

export default router;