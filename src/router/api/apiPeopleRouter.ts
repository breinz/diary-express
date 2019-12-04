import { Router } from "express";

import apiPeopleMiddleware from "../../middleware/api/apiPeopleMiddleware";
import apiPeopleController from "../../controller/api/apiPeopleController";
import userMiddleware from "../../middleware/userMiddleware";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.get('/',
    apiPeopleMiddleware.getList,
    apiPeopleController.getList
);

router.get('/people',
    apiPeopleMiddleware.getPeoplePopulated,
    apiPeopleController.getPeople
);

router.post("/",
    apiPeopleMiddleware.validNew,
    apiPeopleController.post
);

router.patch("/",
    apiPeopleMiddleware.getPeople,
    apiPeopleController.patch
);

router.delete("/",
    apiPeopleMiddleware.getPeople,
    apiPeopleController.delete
);

export default router;