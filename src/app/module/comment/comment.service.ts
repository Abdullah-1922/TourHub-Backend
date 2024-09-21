import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Package } from "../tourPackage/package.model";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";
import { User } from "../User/user.model";

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
  console.log(userData);
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

  const newComment = await Comment.create({
    ...payload,
    averageRating: payload.averageRating,
  });

  const addCommentToPackage = await Package.findByIdAndUpdate(
    tourPackageId,
    { $push: { comments: newComment._id } },
    { new: true }
  );
  console.log(addCommentToPackage);
  return newComment;
};

export const CommentServices = {
  createComment,
};
