import { Router } from "express";

import apiContactController from "./../../controller/api/apiContactController";


const router = Router();

router.post("/",
    apiContactController.post
);

export default router;