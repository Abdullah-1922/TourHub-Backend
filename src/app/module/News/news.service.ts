import { QueryBuilder } from "../../builder/QueryBuilder";
import { TNews } from "./news.interface";
import { News } from "./news.model";

const createNews = async (payload: Partial<TNews>) => {
  const res = await News.create(payload);
  return res;
};
const getAllNews = async () => {
  const result = await News.find()
  return result;
};

const deleteSingleNews = async (id: string) => {
  const result = await News.updateOne({ id }, { isDeleted: true });

  return result;
};

export const NewsServices = {
  createNews,
  getAllNews,
  deleteSingleNews
};