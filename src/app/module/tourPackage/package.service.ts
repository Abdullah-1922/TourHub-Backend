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
  if (query?.category) {
    query.category = (query.category as string).split(",");
  }

  const tourPackageQuery = new QueryBuilder(
    Package.find({ isDeleted: false }),
    query,
  )
    .search(["country","location"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await tourPackageQuery.modelQuery;
  const meta=await  tourPackageQuery.countTotal()
  return {result,meta};
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

const getLocationWithCountry=async()=>{
  const locationData =await Package.find({}).select(['country','location'])

console.log(locationData);
const uniqueLocations =new Set()
const result:string[]=[]
locationData.forEach(item => {
  const formattedLocation = `${item.location},${item.country}`;
  if (!uniqueLocations.has(item.location)) {  // Avoid duplicate locations
    uniqueLocations.add(item.location);
    result.push(formattedLocation);
  }
});
  return result;
}

export const PackageServices = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
  getLocationWithCountry
};
