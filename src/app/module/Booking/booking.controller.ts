import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBooking(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking retrieved successfully",
    data: result,
  });
});
const bookingByUser = catchAsync(async (req, res) => {
 
  const result = await BookingService.bookingByUser(req.params.id,req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking retrieved successfully",
    data: result,
  });
});
const alreadyBooked = catchAsync(async (req, res) => {
  const result = await BookingService.alreadyBooked(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    data: result,
  });
});
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingService.createBooking(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: result,
  });
});
const getBasicStats = catchAsync(async (req, res) => {
  const result = await BookingService.getBasicStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Basic stats retrieved successfully",
    data: result,
  });
});
export const BookingControllers = {
  getAllBooking,
  alreadyBooked,
  createBooking,
  bookingByUser,
  getBasicStats
};
