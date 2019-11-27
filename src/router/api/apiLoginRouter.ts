import { Router } from "express";
import loginController from "../../controller/loginController";
import userMiddleware from "../../middleware/userMiddleware";

const router = Router();

router.post("/",
    userMiddleware.apiValidLogin,
    loginController.apiPostLogin
);

export default router;