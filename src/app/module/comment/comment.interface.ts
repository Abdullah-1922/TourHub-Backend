import { Types } from "mongoose";

export interface TComment {
    userId: Types.ObjectId;
    tourPackageId:  Types.ObjectId;
    locationRating: number;
    foodRating: number;
    roomRating: number;
    priceRating: number;
    tourOperatorRating: number;
    amenitiesRating: number;
    comment: string;
    image?: string[];
    averageRating: number
}