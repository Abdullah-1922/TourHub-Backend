import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: TCategory) => {
  const res = await Category.create(payload);
  return res;
};

export const CategoryServices = {
  createCategory,
};
