import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TNews } from "./news.interface";
import { News } from "./news.model";

const createNews = async (payload: Partial<TNews>) => {
  const res = await News.create(payload);
  return res;
};
const getAllNews = async (query: Record<string, unknown>) => {
  const newsQuery = new QueryBuilder(News.find(), query)
    .search(["newsCategory", "title", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await newsQuery.modelQuery;
  return result;
};

const deleteSingleNews = async (id: string) => {
  const result = await News.findByIdAndDelete(id);

  return result;
};
const getSingleNews = async (id: string) => {
  const result = await News.findById(id);

  return result;
};
const updateNews = async (id: string, payload: Partial<TNews>) => {
  const news = await News.findById(id);
  if (!news) {
    throw new AppError(404, "News id Invalid");
  }
  const result = await News.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const NewsServices = {
  createNews,
  getAllNews,
  deleteSingleNews,
  getSingleNews,
  updateNews,
};
