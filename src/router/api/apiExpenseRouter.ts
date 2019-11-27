import { Router } from "express";
import userMiddleware from "../../middleware/userMiddleware";
import dateMiddleware from "../../middleware/dateMiddleware";
import expenseReportMiddleware from "../../middleware/expenseReportMiddleware";
import expenseMiddleware from "../../middleware/expenseMiddleware";
import expenseController from "../../controller/expenseController";
import apiExpenseCategoryRouter from "../../router/api/apiExpenseCategoryRouter";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.use("/category", apiExpenseCategoryRouter);

router.get("/",
    dateMiddleware.getPeriod,
    expenseMiddleware.getExpenses,
    expenseReportMiddleware.getMonth,
    expenseController.apiGetIndex
);

export default router;