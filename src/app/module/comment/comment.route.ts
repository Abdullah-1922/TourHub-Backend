import { Router } from "express";
import { CommentControllers } from "./comment.controller";

const route =Router()

route.post('/',CommentControllers.createComment)

export const CommentRoutes = route