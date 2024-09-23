import { Types } from "mongoose";

export interface TNews {
  user: Types.ObjectId;
  newsCategory: string;
  title: string;
  description: string;
  images: string;
}
