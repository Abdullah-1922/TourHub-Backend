import { Types } from "mongoose";

export interface TFeature {
  include: string[];
  exclude: string[];
}


export interface TPackage {
  user: Types.ObjectId;
  name:string;
  startDate: Date;
  endDate: Date;
  price: number;
  totalPeople: string;
  description: string;
  cardImage: string;
  bannerImage: string[];
  features: TFeature;
  category: string[];
  country: string;
  location: string;
  isDeleted: boolean;
}
