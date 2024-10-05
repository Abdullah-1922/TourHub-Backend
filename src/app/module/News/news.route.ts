import { Router } from "express";

import { NewsControllers } from "./news.controller";
import validateRequest from "../../middlewares/validateRequest";
import { NewsValidation } from "./news.validation";

const router = Router();

router.post(
  "/create-news",
  validateRequest(NewsValidation.NewsValidationSchema),
  NewsControllers.createNews,
);
router.get("/", NewsControllers.getAllNews);
router.delete("/:newsId", NewsControllers.deleteNewsWithId);
router.get("/:newsId", NewsControllers.getSingleNews);
router.patch("/:newsId", NewsControllers.updateNews);

export const NewsRouter = router;
