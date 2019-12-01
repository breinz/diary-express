import { Router } from "express";

import ApiExpenseRouter from "./api/apiExpenseRouter";
import ApiLoginRouter from "./api/apiLoginRouter";
import ApiSigninRouter from "./api/apiSigninRouter";
import ApiUserRouter from "./api/apiUserRouter";
import ApiPeopleRouter from "./api/apiPeopleRouter";
import ApiCountryRouter from "./api/apiCountryRouter";
import ApiEventRouter from "./api/apiEventRouter";


const router = Router();

router.use("/login", ApiLoginRouter);
router.use("/signin", ApiSigninRouter);
router.use("/user", ApiUserRouter);
router.use("/expense", ApiExpenseRouter);
router.use("/people", ApiPeopleRouter);
router.use("/country", ApiCountryRouter);
router.use("/event", ApiEventRouter);

//router.get("/");

export default router;