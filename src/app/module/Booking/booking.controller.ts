import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";

const getAllBooking= catchAsync(async(req,res)=>{
    const result = await BookingService.getAllBooking(req.query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking retrieved successfully",
      data: result,
    });
})
export const BookingControllers = {
  getAllBooking,
};