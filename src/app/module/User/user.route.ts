/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";

import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(UserValidation.CreateUserValidationSchema),
  UserControllers.createUser,
);

router.get("/", UserControllers.getAllUser);
router.patch("/update-profile",validateRequest(UserValidation.updateUserValidationSchema), UserControllers.updateUser);
router.get("/:id", UserControllers.getSingleUser);

export const UserRoutes = router;
