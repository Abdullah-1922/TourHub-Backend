import { model, Schema } from "mongoose";
import { TNews } from "./news.interface";

const NewsSchema: Schema = new Schema<TNews>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    newsCategory: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images:  { type: String, required: true },
  },
  { timestamps: true }
);

export const News = model<TNews>("News", NewsSchema);
