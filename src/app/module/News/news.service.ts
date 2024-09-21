import { TNews } from "./news.interface";
import { News } from "./news.model";

const createNews = async (payload: Partial<TNews>) => {
  const res = await News.create(payload);
  return res;
};

export const NewsServices = {
  createNews,
};