import { Router } from "express";

import ApiExpenseRouter from "./api/apiExpenseRouter";
import ApiLoginRouter from "./api/apiLoginRouter";
import ApiSigninRouter from "./api/apiSigninRouter";
import ApiUserRouter from "./api/apiUserRouter";
import ApiPeopleRouter from "./api/apiPeopleRouter";
import ApiCountryRouter from "./api/apiCountryRouter";
import ApiEventRouter from "./api/apiEventRouter";
import ApiDiaryRouter from "./api/apiDiaryRouter";
import ApiContactRouter from "./api/apiContactRouter";

const router = Router();

router.use("/login", ApiLoginRouter);
router.use("/signin", ApiSigninRouter);
router.use("/user", ApiUserRouter);
router.use("/diary", ApiDiaryRouter);
router.use("/expense", ApiExpenseRouter);
router.use("/people", ApiPeopleRouter);
router.use("/country", ApiCountryRouter);
router.use("/event", ApiEventRouter);
router.use("/contact", ApiContactRouter);

//router.get("/");

export default router;