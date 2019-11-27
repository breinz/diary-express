import { Router } from "express";
import expenseCategoryMiddleware from "../../middleware/expenseCategoryMiddleware";
import apiExpenseCategoryMiddleware from "../../middleware/api/apiExpenseCategoryMiddleware";
import apiExpenseCategoryController from "../../controller/api/apiExpenseCategoryController";

const router = Router();

router.get("/",
    apiExpenseCategoryMiddleware.getCategories,
    apiExpenseCategoryController.getIndex
);

router.post("/new",
    apiExpenseCategoryMiddleware.validNew,
    apiExpenseCategoryController.postNew
);

router.post("/edit",
    apiExpenseCategoryMiddleware.getCategory,
    apiExpenseCategoryMiddleware.validEdit,
    apiExpenseCategoryController.postEdit
);

router.patch("/delete",
    apiExpenseCategoryMiddleware.getCategory,
    apiExpenseCategoryController.patchDelete
);

router.patch("/recover",
    apiExpenseCategoryMiddleware.getCategory,
    apiExpenseCategoryController.patchRecover
);

router.delete("/remove",
    apiExpenseCategoryMiddleware.getCategory,
    apiExpenseCategoryController.deleteRemove
);

export default router;