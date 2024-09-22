import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { PackageServices } from "./package.service";
import sendResponse from "../../utils/sendResponse";

const createPackage = catchAsync(async (req, res) => {
  const result = await PackageServices.createPackage(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package is created successfully",
    data: result,
  });
});
const getAllPackage = catchAsync(async (req, res) => {
  const result = await PackageServices.getAllPackage(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package retrieved successfully",
    data: result,
  });
});
export const PackageControllers = {
  createPackage,
  getAllPackage
};
