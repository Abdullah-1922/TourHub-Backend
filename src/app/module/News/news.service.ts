import { QueryBuilder } from "../../builder/QueryBuilder";
import { TNews } from "./news.interface";
import { News } from "./news.model";

const createNews = async (payload: Partial<TNews>) => {
  const res = await News.create(payload);
  return res;
};
const getAllNews = async (query: Record<string, unknown>) => {
  const allNews = new QueryBuilder(
    News.find({ isDeleted: false }),
    query
  )
  const result = await allNews.modelQuery;
  return result;
};
export const NewsServices = {
  createNews,
  getAllNews
};