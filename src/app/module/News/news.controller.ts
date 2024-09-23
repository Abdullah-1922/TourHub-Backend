import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { NewsServices } from "./news.service";
import sendResponse from "../../utils/sendResponse";

const createNews = catchAsync(async (req, res) => {
  const result = await NewsServices.createNews(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News is created successfully",
    data: result,
  });
});

// get all news
const getAllNews = catchAsync(async (req, res) => {
  const result = await NewsServices.getAllNews(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "News retrieved successfully",
    data: result,
  });
});

// delete news using id.......
const deleteNewsWithId = catchAsync(async (req, res) => {
  const newsId = req.params.newsId;

  const result = await NewsServices.deleteSingleNews(newsId);
  res.status(200).json({
    success: true,
    message: "news data deleted successfully!",
    data: result,
  });
});
const getSingleNews = catchAsync(async (req, res) => {
  const newsId = req.params.newsId;
  const result = await NewsServices.getSingleNews(newsId);
  res.status(200).json({
    success: true,
    message: "news retrieved successfully!",
    data: result,
  });
});
const updateNews = catchAsync(async (req, res) => {
  const newsId = req.params.newsId;
  const result = await NewsServices.updateNews(newsId, req.body);
  res.status(200).json({
    success: true,
    message: "news updated successfully !",
    data: result,
  });
});

export const NewsControllers = {
  createNews,
  getAllNews,
  deleteNewsWithId,
  getSingleNews,
  updateNews,
};
