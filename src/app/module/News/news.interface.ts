import { Types } from "mongoose";


export interface TNews{
  user: Types.ObjectId;
  newsCategory: string[];
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
