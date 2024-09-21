import { model, Schema } from "mongoose";
import { TNews} from "./news.interface";

const NewsSchema: Schema = new Schema<TNews>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    newsCategory: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],

  },
  { timestamps: true }
);

export const News = model<TNews>("Package", NewsSchema);
