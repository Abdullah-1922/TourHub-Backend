import { Router } from "express";
import { CategoryControllers } from "./category.controller";

const route=Router()

route.post('/',CategoryControllers.createCategory)

export const CategoryRoutes=route