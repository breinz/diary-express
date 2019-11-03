import { Router } from "express";

import expenseCategoryRouter from "./expenseCategoryRouter";
import expenseController from "../controller/expenseController";
import userMiddleware from "../middleware/userMiddleware";
import expenseCategoryMiddleware from "../middleware/expenseCategoryMiddleware";
import expenseMiddleware from "../middleware/expenseMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";
import expenseReportMiddleware from "../middleware/expenseReportMiddleware";

const router = Router();


router.use(userMiddleware.adminShield);

router.use("/category", expenseCategoryRouter);

router.get("/",
    expenseMiddleware.getExpenses,
    expenseReportMiddleware.getReport,
    expenseController.getIndex
);

router.get("/new",
    expenseCategoryMiddleware.getCategories,
    expenseController.getNew
);

router.post('/new',
    expenseMiddleware.validNew,
    expenseController.postNew,
    expenseReportMiddleware.setDirty
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
    expenseController.postEdit,
    expenseReportMiddleware.setDirty
);

router.delete("/:id/delete",
    expenseMiddleware.getExpense,
    expenseController.deleteDelete,
    expenseReportMiddleware.setDirty
);

router.get("/:year-:month",
    expenseMiddleware.getMonth,
    expenseMiddleware.getExpenses,
    expenseReportMiddleware.getReport,
    expenseController.getMonth
);

router.get("/:id",
    expenseMiddleware.getExpensePopulated,
    expenseController.getExpense
);

export default router;