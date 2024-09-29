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

  const {result,meta} = await CommentServices.getCommentForPackage(
    req.params.id,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrieved successfully",
    data: result,
    meta:meta
  });
});
const addCommentHelpful= catchAsync(async (req, res) => {
  console.log(req.params.id, req.query);
  const result = await CommentServices.addHelpful(
    req.body.clerkId,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment helpful added successfully",
    data: result,
  });
});
const addCommentNotHelpful = catchAsync(async (req, res) => {
  console.log(req.params.id, req.query);
  const result = await CommentServices.addNotHelpful(
    req.body.clerkId,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment NotHelpful added successfully",
    data: result,
  });
});


export const CommentControllers = {
  createComment,
  getCommentForPackage,
  addCommentHelpful,
  addCommentNotHelpful
};
