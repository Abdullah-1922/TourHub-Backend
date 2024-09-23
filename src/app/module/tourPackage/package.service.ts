import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Comment } from "../comment/comment.model";
import { TPackage } from "./package.interface";
import { Package } from "./package.model";

const createPackage = async (payload: Partial<TPackage>) => {
  const res = await Package.create(payload);
  return res;
};
const getAllPackage = async (query: Record<string, unknown>) => {
  const tourPackage = new QueryBuilder(
    Package.find({ isDeleted: false }),
    query,
  )
    .search(["country", "location"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await tourPackage.modelQuery;
  return result;
};
const getSinglePackage = async (id: string) => {
  const result = await Package.findById(id);
  return result;
};
const updatePackage = async (id: string, payload: Partial<TPackage>) => {
  const tourPackage = await Package.findById(id);
  if (!tourPackage) {
    throw new AppError(404, "Tour package not found");
  }
  const result = await Package.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deletePackage = async (id: string) => {
  const tourPackage = await Package.findById(id);
  if (!tourPackage) {
    throw new AppError(404, "Tour package not found");
  }

  const result = await Package.findByIdAndDelete(id, { new: true });
  if (result) {
    await Comment.deleteMany({ tourPackageId: id });
  }

  return result;
};

export const PackageServices = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
