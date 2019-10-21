import { Router } from "express";

import expenseCategoryRouter from "./expenseCategoryRouter";
import expenseController from "../controller/expenseController";
import userMiddleware from "../middleware/userMiddleware";
import expenseCategoryMiddleware from "../middleware/expenseCategoryMiddleware";
import expenseMiddleware from "../middleware/expenseMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";

const router = Router();


router.use(userMiddleware.adminShield);

router.use("/category", expenseCategoryRouter);

router.get("/",
    expenseMiddleware.getExpenses,
    expenseMiddleware.getReport,
    expenseController.getIndex
);

router.get("/new",
    expenseCategoryMiddleware.getCategories,
    expenseController.getNew
);

router.post('/new',
    expenseMiddleware.validNew,
    expenseController.postNew
);

router.get("/:id/edit",
    expenseCategoryMiddleware.getCategories,
    expenseMiddleware.getExpense,
    refererMiddleware.save,
    expenseController.getEdit
);

router.post("/:id/edit",
    expenseMiddleware.getExpense,
    expenseMiddleware.validEdit,
    refererMiddleware.retrieve,
    expenseController.postEdit
);

router.delete("/:id/delete",
    expenseMiddleware.getExpense,
    expenseController.deleteDelete
);

router.get("/:id",
    expenseMiddleware.getExpensePopulated,
    expenseController.getExpense
);

export default router;