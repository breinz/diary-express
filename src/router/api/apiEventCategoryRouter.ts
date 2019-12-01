import { Router } from "express";

import apiEventCategoryController from "../../controller/api/apiEventCategoryController";
import apiEventCategoryMiddleware from "../../middleware/api/apiEventCategoryMiddleware";

const router = Router();

router.get("/",
    apiEventCategoryMiddleware.getList,
    apiEventCategoryController.getList
);

router.get("/category",
    apiEventCategoryMiddleware.getItemPopulated,
    apiEventCategoryController.getItem
);

router.post("/",
    // validator
    apiEventCategoryController.post
);

router.patch('/',
    apiEventCategoryMiddleware.getItem,
    apiEventCategoryController.patch
);

router.delete('/',
    apiEventCategoryMiddleware.getItem,
    apiEventCategoryController.delete
);



export default router;