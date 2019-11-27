import { Router } from "express";
import userController from "../../controller/userController";

const router = Router();

router.post("/emailTaken",
    userController.emailTaken
);

export default router;