import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PackageValidation } from "./package.validation";
import { PackageControllers } from "./package.controller";
// import auth from "../../middlewares/authValidation";

const router = Router();

router.post(
  "/create-package",
  // auth(),
  validateRequest(PackageValidation.CreatePackageValidationSchema),
  PackageControllers.createPackage
);
router.get("/", PackageControllers.getAllPackage);
router.get("/location-country", PackageControllers.getLocationWithCountry);
router.get("/:id", PackageControllers.getSinglePackage);
router.delete("/:id", PackageControllers.deletePackage);
router.patch("/rating", PackageControllers.createRating);  /////
router.patch("/:id", PackageControllers.updatePackage);

export const PackageRoutes = router;
