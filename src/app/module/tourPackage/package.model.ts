import { model, Schema } from "mongoose";
import { TFeature, TPackage } from "./package.interface";

const FeatureSchema = new Schema<TFeature>(
  {
    include: { type: [String], required: true },
    exclude: { type: [String], required: true },
  },
  { _id: false, versionKey: false }
);

const PackageSchema: Schema = new Schema<TPackage>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    startDate: { type: Date, required: true },
    name: { type: String, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    totalPeople: { type: String, required: true },
    description: { type: String, required: true },
    cardImage: { type: String, required: true },
    bannerImage: { type: [String], required: true },
    features: { type: FeatureSchema, required: true },
    category: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    country: { type: String, required: true },
    location: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Package = model<TPackage>("Package", PackageSchema);
