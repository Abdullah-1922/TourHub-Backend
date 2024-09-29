import mongoose from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new mongoose.Schema<TComment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clerkId:{type:String,required:true},
  tourPackageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourPackage",
    required: true,
  },
  title:{type:String,required:true},

  helpful:{type:[String],required:true,default:[]},
  notHelpful:{type:[String],required:true,default:[]},
  comment: { type: String, required: true },
  images: { type: [String] },

},{timestamps:true});

export const Comment = mongoose.model<TComment>("Comment", commentSchema);
