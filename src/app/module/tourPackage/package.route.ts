import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PackageValidation } from "./package.validation";
import { PackageControllers } from "./package.controller";

const router = Router()

router.post("/create-package",validateRequest(PackageValidation.CreatePackageValidationSchema),PackageControllers.createPackage)


export const PackageRoutes = router