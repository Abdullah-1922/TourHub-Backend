import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Package } from "../tourPackage/package.model";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { User } from "../User/user.model";
import mongoose from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";

const createComment = async (payload: Partial<TComment>) => {
  const {
    tourPackageId,
    // locationRating = 1,
    // foodRating = 1,
    // roomRating = 1,
    // priceRating = 1,
    // tourOperatorRating = 1,
    // amenitiesRating = 1,
  } = payload;

  const packageData = await Package.findById(tourPackageId);
  const userData = await User.findOne({ clerkId: payload.clerkId });

  if (!packageData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid package Id");
  }
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid user clerkId");
  }

  payload.userId = userData._id;



  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [newComment] = await Comment.create(
      [{ ...payload }],
      { session }
    );

    await Package.findByIdAndUpdate(
      tourPackageId,
      { $push: { comments: newComment._id } },
      { new: true, session }
    );

    // if (addCommentToPackage) {
    //   const comments = await Comment.find({ tourPackageId }).session(session);

    //   if (comments.length === 0) {
    //     await Package.findByIdAndUpdate(
    //       tourPackageId,
    //       { averageRating: 1 },
    //       { session }
    //     );
    //   } else {
    //     const totalAverageRating = comments.reduce(
    //       (acc, comment) => acc + comment.averageRating,
    //       0
    //     );
    //     const newAverageRating = (totalAverageRating / comments.length).toFixed(
    //       1
    //     );

    //     await Package.findByIdAndUpdate(
    //       tourPackageId,
    //       {
    //         averageRating: newAverageRating,
    //       },
    //       { session }
    //     );
    //   }
    // }

    await session.commitTransaction();
    session.endSession();

    return newComment;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create comment"
    );
  }
};

const getCommentForPackage = async (
  packageId: string,
  query: Record<string, unknown>
) => {
  const tourPackage = await Package.findById(packageId);

  if (!tourPackage) {
    throw new AppError(404, "Invalid package Id");
  }

  const packageComment = new QueryBuilder(
    Comment.find({ tourPackageId: packageId }),
    query
  )
    .search(["comment"])
    .filter()
    .sort("commentSection")
    .paginate()
    .fields();
  const result = await packageComment.modelQuery;
  return result;
};

const addHelpful = async (clerkId: string, commentId: string) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "invalid comment id");
  }
  const user = await User.findOne({
    clerkId,
  });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "invalid clerk id");
  }
  if(comment.notHelpful.includes(clerkId)){
    throw new AppError(httpStatus.BAD_REQUEST, "Already select notUseful ");
  }

  if (!comment.helpful.includes(clerkId)) {
    comment.helpful.push(clerkId);
    const result = await comment.save();
    return result;
  }else{
    throw new AppError(httpStatus.BAD_REQUEST,'Already useful')
  }
};
const addNotHelpful = async (clerkId: string, commentId: string) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "invalid comment id");
  }
  const user = await User.findOne({
    clerkId,
  });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "invalid clerk id");
  }
  if(comment.helpful.includes(clerkId)){
    throw new AppError(httpStatus.BAD_REQUEST, "Already select useful ");
  }


  if (!comment.helpful.includes(clerkId)) {
    comment.notHelpful.push(clerkId);
    const result = await comment.save();
    return result;
  }else{
    throw new AppError(httpStatus.BAD_REQUEST,'Already not-useful')
  }
};

export const CommentServices = {
  createComment,
  getCommentForPackage,
  addHelpful,
  addNotHelpful,
};
