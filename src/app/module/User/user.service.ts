import { clerkClient } from "@clerk/clerk-sdk-node";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userPayload: TUser) => {
  const result = await User.create(userPayload);

  if (userPayload.clerkId) {
 
    await clerkClient.users.updateUserMetadata(
      userPayload.clerkId,
      {
        publicMetadata: {
          role: "user",
        },
      }
    );

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

export const UserServices = {
  createUser,

  getAllUser,
  getSingleUser,
};
