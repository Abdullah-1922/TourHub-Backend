import mongoose from "mongoose";
import { TComment } from "./comment.interface";



const commentSchema = new mongoose.Schema<TComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tourPackageId: { type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage', required: true },
  locationRating: { type: Number, required: true, min: 0, max: 5 },
  foodRating: { type: Number, required: true, min: 0, max: 5 },
  roomRating: { type: Number, required: true, min: 0, max: 5 },
  priceRating: { type: Number, required: true, min: 0, max: 5 },
  tourOperatorRating: { type: Number, required: true, min: 0, max: 5 },
  amenitiesRating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: true },
  image:{type:[String]},
  averageRating: { type: Number,default:0 } 
});

export const Comment = mongoose.model<TComment>('Comment', commentSchema);

