import { Types } from "mongoose";

export interface TFeature {
  include: string[];
  exclude: string[];
}

export interface TPackage {
  user: Types.ObjectId;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  totalPeople: string;
  description: string;
  cardImage: string;
  bannerImage: string[];
  features: TFeature;
  category: string[];
  country: string;
  location: string;
  comments: string[];
  averageRating: number;
  isDeleted: boolean;
}
