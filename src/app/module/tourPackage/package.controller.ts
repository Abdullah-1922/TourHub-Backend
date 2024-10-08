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
  const {meta,result} = await PackageServices.getAllPackage(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package retrieved successfully",
    data: result,
    meta:meta
  });
});
const getSinglePackage = catchAsync(async (req, res) => {
  const result = await PackageServices.getSinglePackage(req.params.id,req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package retrieved successfully",
    data: result,
  });
});
const deletePackage = catchAsync(async (req, res) => {
  const result = await PackageServices.deletePackage(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package deleted successfully",
    data: result,
  });
});
const deleteBulkPackages = catchAsync(async (req, res) => {
  const result = await PackageServices.deleteBulkPackages(req.body.ids);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Packages deleted successfully",
    data: result,
  });
});

const updatePackage = catchAsync(async (req, res) => {
  const result = await PackageServices.updatePackage(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package updated successfully",
    data: result,
  });
});
const getLocationWithCountry = catchAsync(async (req, res) => {
  const result = await PackageServices.getLocationWithCountry();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Packages location with country retrieved successfully",
    data: result,
  });
});
const createRating = catchAsync(async (req, res) => {
  const result = await PackageServices.createRating(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rating added successfully",
    data: result,
  });
});
const getTopLocations = catchAsync(async (req, res) => {
  const result = await PackageServices.getTopBookedLocations();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Top locations retrieved successfully",
    data: result,
  });
});

export const PackageControllers = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  deletePackage,
  updatePackage,
  getLocationWithCountry,
  createRating,
  getTopLocations,
  deleteBulkPackages
};
