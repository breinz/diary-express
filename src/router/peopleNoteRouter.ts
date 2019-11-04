import { Router } from "express";

import peopleNoteController from "../controller/peopleNoteController";
import refererMiddleware from "../middleware/RefererMiddleware";
import peopleController from "../controller/peopleController";

const router = Router();

router.get("/new",
    refererMiddleware.save,
    peopleNoteController.getNew
);

router.post("/new",
    refererMiddleware.retrieve,
    peopleNoteController.postNew
);

router.get("/:index/edit",
    refererMiddleware.save,
    peopleNoteController.getEdit
);

router.post("/:index/edit",
    refererMiddleware.retrieve,
    peopleNoteController.postEdit
);

router.delete("/:index/delete",
    peopleNoteController.deleteDelete
);

export default router;