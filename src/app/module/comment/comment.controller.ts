import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createComment(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});
const getCommentForPackage = catchAsync(async (req, res) => {
  console.log(req.params.id, req.query);
  const result = await CommentServices.getCommentForPackage(
    req.params.id,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrieved successfully",
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getCommentForPackage,
};
