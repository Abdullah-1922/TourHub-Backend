import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { NewsServices } from "./news.service";
import sendResponse from "../../utils/sendResponse";

const createNews = catchAsync(
    async(req,res)=>{
        const result = await NewsServices.createNews(req.body);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "News is created successfully",
            data: result,
        });
    }
)
export const NewsControllers = {
   createNews
};