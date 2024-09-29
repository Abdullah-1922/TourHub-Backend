import { model, Schema } from "mongoose";
import { TFeature, TPackage } from "./package.interface";

const FeatureSchema = new Schema<TFeature>(
  {
    include: { type: [String], required: true },
    exclude: { type: [String], required: true },
  },
  { _id: false, versionKey: false }
);
const itinerarySchema = new Schema(
  {
    day: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);


const ratingSchema = new Schema(
  {
     locationRating: { type: Number, required: true, min: 1, max: 5,default:1 },
  foodRating: { type: Number, required: true, min: 1, max: 5,default:1 },
  roomRating: { type: Number, required: true, min: 1, max: 5,default:1 },
  priceRating: { type: Number, required: true, min: 1, max: 5,default:1 },
  tourOperatorRating: { type: Number, required: true, min: 1, max: 5,default:1 },
  amenitiesRating: { type: Number, required: true, min: 1, max: 5 ,default:1},
  clerkId: { type: String, required: true },
  tourPackageId: { type: String, required: true }
  },
  { _id: false, versionKey: false }
);



const PackageSchema: Schema = new Schema<TPackage>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    startDate: { type: String, required: true },
    name: { type: String, required: true },
    endDate: { type: String, required: true },
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
    itinerary:{type:[itinerarySchema],required:true},
    tourDuration:{type:String,required:true},
    mapLocation:{type:String,required:true},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    rating:{ type: [ratingSchema],default:[]},
    totalAverageRating: { type: Number, default: 1 },
    averageTourOperatorRating: { type: Number, default: 1 },
    averageAmenitiesRating: { type: Number, default: 1 },
    averageFoodRating: { type: Number, default: 1 },
    averageLocationRating: { type: Number, default: 1 },
    averagePriceRating: { type: Number, default: 1 },
    averageRoomRating: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Package = model<TPackage>("Package", PackageSchema);
