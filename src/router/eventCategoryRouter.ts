import { Router } from "express";

import eventCategoryController from "../controller/eventCategoryController";
import eventCategoryMiddleware from "../middleware/eventCategoryMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";

const router = Router();

router.get("/",
    eventCategoryMiddleware.getCategories,
    eventCategoryController.getIndex
);

router.get("/new",
    eventCategoryController.getNew
);

router.post("/new",
    eventCategoryMiddleware.validNew,
    eventCategoryController.postNew
);

router.get("/:id/edit",
    refererMiddleware.save,
    eventCategoryMiddleware.getCategory,
    eventCategoryController.getEdit
);

router.post("/:id/edit",
    eventCategoryMiddleware.getCategory,
    eventCategoryMiddleware.validEdit,
    refererMiddleware.retrieve,
    eventCategoryController.postEdit
);

router.delete("/:id/delete",
    eventCategoryMiddleware.getCategory,
    eventCategoryController.deleteDelete
);

router.get("/:id/recover",
    eventCategoryMiddleware.getCategory,
    eventCategoryController.getRecover
);

router.delete("/:id/remove",
    eventCategoryMiddleware.getCategory,
    eventCategoryController.deleteRemove
);

router.get("/:id",
    eventCategoryMiddleware.getCategory,
    eventCategoryController.getCategory
);

export default router;