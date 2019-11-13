import { Router } from "express";

import peopleController from "../controller/peopleController";
import peopleMiddleware from "../middleware/peopleMiddleware";
import countryMiddleware from "../middleware/countryMiddleware";
import refererMiddleware from "../middleware/RefererMiddleware";
import userMiddleware from "../middleware/userMiddleware";
import peopleNoteRouter from "./peopleNoteRouter";
import stepMiddleware from "../middleware/stepMiddleware";

const router = Router();

router.use(userMiddleware.adminShield);

router.use((req, res, next) => {
    res.locals.menuItem = "people";
    next();
});

router.use("/:id/note",
    peopleMiddleware.getPeople,
    peopleNoteRouter
);

router.get("/",
    peopleMiddleware.getPeoples,
    peopleController.getIndex
);

router.get("/new",
    countryMiddleware.getForSelect,
    peopleMiddleware.initForm,
    peopleController.getNew
);

router.post("/new",
    stepMiddleware.saveStep,
    peopleMiddleware.validNew,
    peopleController.postNew
);

router.get("/:id/edit",
    refererMiddleware.save,
    peopleMiddleware.getPeople,
    countryMiddleware.getForSelect,
    peopleController.getEdit
);

router.post("/:id/edit",
    peopleMiddleware.getPeople,
    peopleMiddleware.validEdit,
    refererMiddleware.retrieve,
    peopleController.postEdit
);

router.delete("/:id/delete",
    peopleMiddleware.getPeople,
    peopleController.deleteDelete
);

router.get("/:id/recover",
    peopleMiddleware.getPeople,
    peopleController.getRecover
);

router.delete("/:id/remove",
    peopleMiddleware.getPeople,
    peopleController.deleteRemove
);

router.get("/:id",
    peopleMiddleware.getPeople,
    peopleController.getPeople
);

export default router;