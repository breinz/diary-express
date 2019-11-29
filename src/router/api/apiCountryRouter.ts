import { Router } from "express";

import userMiddleware from "../../middleware/userMiddleware";
import apiCountryMiddleware from "../../middleware/api/apiCountryMiddleware";
import apiCountryController from "../../controller/api/apiCountryController";

const router = Router();

router.use(
    userMiddleware.apiFindUser,
    userMiddleware.tokenShield
);

router.get("/",
    apiCountryMiddleware.getCountries,
    apiCountryController.getCountries
);

router.post('/',
    // validator
    apiCountryController.post
);

router.patch('/',
    apiCountryMiddleware.getCountry,
    apiCountryController.patch
);

router.delete("/",
    apiCountryMiddleware.getCountry,
    apiCountryController.delete
);

export default router;