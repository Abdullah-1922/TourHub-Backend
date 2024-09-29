import { Router } from "express";
import { CommentControllers } from "./comment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CommentValidation } from "./comment.validation";

const route = Router();

route.post(
  "/",
  validateRequest(CommentValidation.createCommentValidation),
  CommentControllers.createComment,
);
route.patch("/:id/helpful", CommentControllers.addCommentHelpful);
route.patch("/:id/not-helpful", CommentControllers.addCommentNotHelpful);

route.get("/:id", CommentControllers.getCommentForPackage);

export const CommentRoutes = route;
