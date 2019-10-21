import { Router } from "express";

import expenseCategoryController from "../controller/expenseCategoryController";
import expenseCategoryMiddleware from "../middleware/expenseCategoryMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";

const expenseCategoryRouter = Router();

expenseCategoryRouter.get("/",
    expenseCategoryMiddleware.getCategories,
    expenseCategoryController.getIndex
);

expenseCategoryRouter.get("/new",
    expenseCategoryController.getNew
);

expenseCategoryRouter.post("/new",
    expenseCategoryMiddleware.validNew,
    expenseCategoryController.postNew
);

expenseCategoryRouter.get("/:id/edit",
    expenseCategoryMiddleware.getCategory,
    refererMiddleware.save,
    expenseCategoryController.getEdit
);

expenseCategoryRouter.post("/:id/edit",
    expenseCategoryMiddleware.getCategory,
    expenseCategoryMiddleware.validEdit,
    refererMiddleware.retrieve,
    expenseCategoryController.postEdit
);

expenseCategoryRouter.delete("/:id/delete",
    expenseCategoryMiddleware.getCategory,
    expenseCategoryController.deleteDelete
);

expenseCategoryRouter.get("/:id/recover",
    expenseCategoryMiddleware.getCategory,
    expenseCategoryController.getRecover

);

expenseCategoryRouter.delete("/:id/remove",
    expenseCategoryMiddleware.getCategory,
    expenseCategoryController.deleteRemove
);

expenseCategoryRouter.get("/:id",
    expenseCategoryMiddleware.getCategory,
    expenseCategoryController.getCategory
);

export default expenseCategoryRouter;