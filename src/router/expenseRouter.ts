import { Router } from "express";

import expenseCategoryRouter from "./expenseCategoryRouter";
import expenseController from "../controller/expenseController";
import userMiddleware from "../middleware/userMiddleware";
import expenseCategoryMiddleware from "../middleware/expenseCategoryMiddleware";
import expenseMiddleware from "../middleware/expenseMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";
import expenseReportMiddleware from "../middleware/expenseReportMiddleware";
import dateMiddleware from "../middleware/dateMiddleware";

const router = Router();


router.use(userMiddleware.adminShield);

router.use((req, res, next) => {
    res.locals.menuItem = "expense";
    next();
});

router.use("/category", expenseCategoryRouter);

router.get("/",
    dateMiddleware.getPeriod,
    expenseMiddleware.getExpenses,
    expenseReportMiddleware.getMonth,
    expenseController.getIndex
);

router.get("/new",
    expenseCategoryMiddleware.getCategories,
    refererMiddleware.save,
    expenseController.getNew
);

router.post('/new',
    expenseMiddleware.validNew,
    refererMiddleware.retrieve,
    expenseController.postNew,
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
);

router.delete("/:id/delete",
    expenseMiddleware.getExpense,
    expenseController.deleteDelete
);

router.get("/:year(\\d{4})-:month(\\d{1,2})/",
    expenseMiddleware.validMonth,
    dateMiddleware.getPeriod,
    expenseMiddleware.getExpenses,
    expenseReportMiddleware.getMonth,
    expenseController.getMonth
);

router.get("/:year(\\d{4})/",
    expenseMiddleware.getExpenses,
    expenseReportMiddleware.getYear,
    expenseController.getYear
);

router.get("/:id",
    expenseMiddleware.getExpensePopulated,
    expenseController.getExpense
);

export default router;