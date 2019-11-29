import { Router } from "express";
import userMiddleware from "../../middleware/userMiddleware";
import dateMiddleware from "../../middleware/dateMiddleware";
import expenseReportMiddleware from "../../middleware/expenseReportMiddleware";
import expenseMiddleware from "../../middleware/expenseMiddleware";
import expenseController from "../../controller/expenseController";
import apiExpenseCategoryRouter from "../../router/api/apiExpenseCategoryRouter";
import apiExpenseCategoryController from "../../controller/api/apiExpenseCategoryController";
import apiExpenseController from "../../controller/api/apiExpenseController";
import apiExpenseMiddleware from "../../middleware/api/apiExpenseMiddleware";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.use("/category", apiExpenseCategoryRouter);

router.get("/",
    dateMiddleware.getPeriod,
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
    dateMiddleware.getPeriod,
    expenseReportMiddleware.getMonth,
    apiExpenseController.getReport

);

router.post('/new',
    apiExpenseMiddleware.validNew,
    apiExpenseController.postNew
);

export default router;