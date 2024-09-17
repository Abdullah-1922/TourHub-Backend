/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userPayload: TUser) => {
  const result = await User.create(userPayload);
  return result;
};

export const UserServices = {
  createUser,
};
