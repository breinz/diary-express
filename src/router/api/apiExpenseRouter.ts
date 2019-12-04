import { Router } from "express";
import userMiddleware from "../../middleware/userMiddleware";
import dateMiddleware from "../../middleware/dateMiddleware";
import apiDateMiddleware from "../../middleware/api/apiDateMiddleware";
import expenseReportMiddleware from "../../middleware/expenseReportMiddleware";
import expenseMiddleware from "../../middleware/expenseMiddleware";
import apiExpenseCategoryRouter from "../../router/api/apiExpenseCategoryRouter";
import apiExpenseController from "../../controller/api/apiExpenseController";
import apiExpenseMiddleware from "../../middleware/api/apiExpenseMiddleware";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.use("/category", apiExpenseCategoryRouter);

router.get("/",
    apiDateMiddleware.getPeriod,
    expenseMiddleware.getExpenses,
    //expenseReportMiddleware.getMonth,
    apiExpenseController.getIndex
);

router.delete("/",
    apiExpenseMiddleware.getExpense,
    apiExpenseController.deleteDelete
);

router.get("/expense",
    apiExpenseMiddleware.getExpense,
    apiExpenseController.getExpense
);

router.patch("/",
    apiExpenseMiddleware.getExpense,
    apiExpenseController.patchExpense
);

router.get('/report',
    apiDateMiddleware.getPeriod,
    expenseReportMiddleware.getMonth,
    apiExpenseController.getReport

);

router.post('/new',
    apiExpenseMiddleware.validNew,
    apiExpenseController.postNew
);

export default router;