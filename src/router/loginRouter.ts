import { Router } from "express";

import loginController from "../controller/loginController";
import userMiddleware from "../middleware/userMiddleware";

const router = Router();

router.get("/",
    loginController.getIndex
);

router.post("/",
    userMiddleware.validLogin,
    loginController.postLogin
)

export default router;