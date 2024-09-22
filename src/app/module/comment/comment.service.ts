import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Package } from "../tourPackage/package.model";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { User } from "../User/user.model";
import mongoose, { ObjectId } from "mongoose";

const createComment = async (payload: Partial<TComment>) => {
  const {
    userId,
    tourPackageId,
    locationRating = 0,
    foodRating = 0,
    roomRating = 0,
    priceRating = 0,
    tourOperatorRating = 0,
    amenitiesRating = 0,
    image,
    comment,
  } = payload;

  const packageData = await Package.findById(tourPackageId);
  const userData = await User.findById(userId);

  if (!packageData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid package Id");
  }
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid user Id");
  }

  const averageRating = parseFloat(
    (
      (locationRating +
        foodRating +
        roomRating +
        priceRating +
        tourOperatorRating +
        amenitiesRating) /
      6
    ).toFixed(1)
  );

  payload.averageRating = averageRating;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [newComment] = await Comment.create(
      [{ ...payload, averageRating: payload.averageRating }],
      { session }
    );

    const addCommentToPackage = await Package.findByIdAndUpdate(
      tourPackageId,
      { $push: { comments: newComment._id } },
      { new: true, session }
    );

    if (addCommentToPackage) {
      const comments = await Comment.find({ tourPackageId }).session(session);

      if (comments.length === 0) {
        await Package.findByIdAndUpdate(
          tourPackageId,
          { averageRating: 0 },
          { session }
        );
      } else {
        const totalAverageRating = comments.reduce(
          (acc, comment) => acc + comment.averageRating,
          0
        );
        const newAverageRating = (totalAverageRating / comments.length).toFixed(
          1
        );

        await Package.findByIdAndUpdate(
          tourPackageId,
          {
            averageRating: newAverageRating,
          },
          { session }
        );
      }
    }

    await session.commitTransaction();
    session.endSession();

    return newComment;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create comment"
    );
  }
};






export const CommentServices = {
  createComment,
};
