/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";

import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",

  validateRequest(UserValidation.CreateUserValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
