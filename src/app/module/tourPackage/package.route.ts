import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PackageValidation } from "./package.validation";
import { PackageControllers } from "./package.controller";
import auth from "../../middlewares/authValidation";

const router = Router();

router.post(
  "/create-package",
  validateRequest(PackageValidation.CreatePackageValidationSchema),
  PackageControllers.createPackage
);
router.get("/", auth(), PackageControllers.getAllPackage);

export const PackageRoutes = router;
