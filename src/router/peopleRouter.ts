import { Router } from "express";

import peopleController from "../controller/peopleController";

const router = Router();

router.get("/",
    peopleController.getIndex
);

router.get("/new",
    peopleController.getNew
);

export default router;