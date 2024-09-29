import { clerkClient } from "@clerk/clerk-sdk-node";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


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
    email?:string
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

export const UserServices = {
  createUser,

  getAllUser,
  getSingleUser,
  updateUser,
};
