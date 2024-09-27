import { Types } from "mongoose";

export interface TComment {
  userId: Types.ObjectId;
  clerkId: string;
  tourPackageId: Types.ObjectId;
  title: string;
  // locationRating: number;
  // foodRating: number;
  // roomRating: number;
  // priceRating: number;
  // tourOperatorRating: number;
  // amenitiesRating: number;
  comment: string;
  helpful: string[];
  notHelpful: string[];
  images?: string[];
 
}
