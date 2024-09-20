import { QueryBuilder } from "../../builder/QueryBuilder";
import { TPackage } from "./package.interface";
import { Package } from "./package.model";

const createPackage = async (payload: Partial<TPackage>) => {
  const res = await Package.create(payload);
  return res;
};
const getAllPackage = async (query: Record<string, unknown>) => {
  const tourPackage = new QueryBuilder(
    Package.find({ isDeleted: false }),
    query
  )
    .search(["country", "location"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await tourPackage.modelQuery;
  return result;
};

export const PackageServices = {
  createPackage,
  getAllPackage,
};
