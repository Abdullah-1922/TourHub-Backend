import { Types } from "mongoose";

export interface TNews {
  user: Types.ObjectId;
  newsCategory: string;
  clerkId: string;
  title: string;
  description: string;
  images: string;
}
