import { Router } from "express";

import signinController from "../controller/signinController";
import userMiddleware from "../middleware/userMiddleware";

const router = Router();

router.get("/",
    signinController.getIndex
);

router.post("/",
    userMiddleware.validSignin,
    signinController.postSignin
);

export default router;