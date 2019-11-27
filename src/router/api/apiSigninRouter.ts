import { Router } from "express";
import signinController from "../../controller/signinController";
import userMiddleware from "../../middleware/userMiddleware";

const router = Router();

router.post("/",
    userMiddleware.apiValidSignin,
    signinController.apiPostSignin
);

export default router;