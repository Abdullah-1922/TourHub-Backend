import { clerkClient } from "@clerk/clerk-sdk-node";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TStripeUser, TUser } from "./user.interface";
import { StripeUser, User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Booking from "../Booking/booking.model";
import { Package } from "../tourPackage/package.model";
import { Comment } from "../comment/comment.model";
import { News } from "../News/news.model";

const createUser = async (userPayload: TUser) => {
  const result = await User.create(userPayload);

  if (userPayload.clerkId) {
    await clerkClient.users.updateUserMetadata(userPayload.clerkId, {
      publicMetadata: {
        role: "user",
      },
    });
  }
  return result;
};
const updateUserRole = async (clerkId: string, currentUserId: string) => {
  const currentUser = await User.findOne({ clerkId: currentUserId }).select(
    "role"
  );

  let userRoll: string = "";

  if (currentUser?.role !== "admin" && currentUser?.role !== "superadmin") {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }
  const requestedUser = await User.findOne({ clerkId: clerkId });

  if (!requestedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (requestedUser.role === "superadmin") {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot update superadmin role");
  }
  if (requestedUser.role === "admin") {
    userRoll = "user";
    await User.findByIdAndUpdate(requestedUser._id, { role: "user" });
  }
  if (requestedUser.role === "user") {
    userRoll = "admin";
    await User.findByIdAndUpdate(requestedUser._id, { role: "admin" });
  }

  if (clerkId) {
    await clerkClient.users.updateUserMetadata(clerkId, {
      publicMetadata: {
        role: userRoll,
      },
    });
  }
  const updatedRequestedUser = await User.findOne({ clerkId: clerkId });
  return updatedRequestedUser;
};

const deleteUser = async (id: string) => {
  const user = await User.findOne({ clerkId: id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid clerk ID");
  }

  const result = await User.deleteOne({ clerkId: id });
  if (result) {
    await Package.deleteMany({ clerkId: id });
    await Booking.deleteMany({ clerkId: id });
    await StripeUser.deleteMany({ clerkId: id });
    await Comment.deleteMany({ clerkId: id });
    await News.deleteMany({ clerkId: id });
    await clerkClient.users.deleteUser(id);
  }

  return result;
};

const getAllUser = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find({}), query)
    .search(["email", "name"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;

  return result;
};
const getSingleUser = async (id: string) => {
  const result = await User.find({ clerkId: id });

  return result;
};
const updateUser = async (payload: TUser) => {
  const user = await User.findOne({ clerkId: payload.clerkId });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid clerk ID");
  }

  type TUserProfile = {
    firstName?: string;
    imageUrl?: string;
    email?: string;
  };

  const userProfile: TUserProfile = {};

  if (payload.name) {
    userProfile.firstName = payload.name;
  }

  if (payload.image) {
    userProfile.imageUrl = payload.image;
  }

  console.log(userProfile);
  const clerkRes = await clerkClient.users.updateUser(
    payload.clerkId as string,
    userProfile
  );

  if (!clerkRes) {
    throw new AppError(500, "failed to update user clerk profile");
  }

  const result = await User.findByIdAndUpdate(user._id, payload, { new: true });
  return result;
};

//////////// stripeUser.service.ts////////////////
const createStripeUser = async (payload: TStripeUser) => {
  const user = await StripeUser.findOne({ clerkId: payload.clerkId });

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const result = await StripeUser.create(payload);

  return result;
};

const getStripeUser = async (id: string) => {
  const user = await StripeUser.findOne({ clerkId: id });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "Stripe User not found");
  }
  return user;
};

export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  createStripeUser,
  getStripeUser,
  updateUserRole,
  deleteUser
};
