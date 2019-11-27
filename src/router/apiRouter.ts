import { Router } from "express";

import ApiExpenseRouter from "./api/apiExpenseRouter";
import ApiLoginRouter from "./api/apiLoginRouter";
import ApiSigninRouter from "./api/apiSigninRouter";
import ApiUserRouter from "./api/apiUserRouter";


const router = Router();

router.use("/login", ApiLoginRouter);
router.use("/signin", ApiSigninRouter);
router.use("/user", ApiUserRouter);
router.use("/expense", ApiExpenseRouter);

//router.get("/");

export default router;