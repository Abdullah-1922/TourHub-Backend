import { TPackage } from "./package.interface";
import { Package } from "./package.model";

const createPackage = async (payload: Partial<TPackage>) => {
  const res = await Package.create(payload);
  return res;
};

export const PackageServices = {
  createPackage,
};