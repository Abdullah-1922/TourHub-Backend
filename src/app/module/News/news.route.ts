import { Router } from "express";

import {NewsControllers } from "./news.controller";
import validateRequest from "../../middlewares/validateRequest";
import { NewsValidation } from "./news.validation";

const router = Router()

// router.post(
//     "/create-package",
//     validateRequest(NewsValidation.NewsValidationSchema),
//     NewsControllers.createNews
//   ); 

router.post("/create-news",NewsControllers.createNews)
router.get("/find-all-news", NewsControllers.getAllNews);

export const NewsRouter = router