import { Router } from "express";

import countryController from "../controller/countryController";
import countryMiddleware from "../middleware/countryMiddleware";

const router = Router();

router.get("/",
    countryMiddleware.getCountries,
    countryController.getIndex
);

router.get("/new",
    countryController.getNew
);

router.post("/new",
    countryMiddleware.validNew,
    countryController.postNew
);

router.get("/:id/edit",
    countryMiddleware.getCountry,
    countryController.getEdit
);

router.post("/:id/edit",
    countryMiddleware.getCountry,
    countryMiddleware.validEdit,
    countryController.postEdit
);

router.delete("/:id/delete",
    countryMiddleware.getCountry,
    countryController.deleteDelete
);

export default router;