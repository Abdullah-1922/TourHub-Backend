import { Types } from "mongoose";

export interface TFeature {
  include: string[];
  exclude: string[];
}

export interface TPackage {
  user: Types.ObjectId;
  name: string;
  clerkId: string;
  startDate: string;
  endDate: string;
  price: number;
  totalPeople: string;
  description: string;
  cardImage: string;
  bannerImage: string[];
  features: TFeature;
  category: string[];
  itinerary: { day: string; title: string; description: string }[];
  tourDuration: string;
  mapLocation: string;
  country: string;
  location: string;
  comments: string[];
  published:boolean;
  guideName:string
  guideContact:string
  pickUpTime:string
  pickUpLocation:string
  rating: {
    locationRating: number;
    foodRating: number;
    roomRating: number;
    priceRating: number;
    tourOperatorRating: number;
    amenitiesRating: number;
    clerkId: string;
    tourPackageId: string;
  }[];
  totalAverageRating: number;
  averageLocationRating: number;
  averageFoodRating: number;
  averageRoomRating: number;
  averagePriceRating: number;
  averageTourOperatorRating: number;
  averageAmenitiesRating: number;
  isDeleted: boolean;
}


export type TRating={
  locationRating: number
  foodRating: number
  roomRating: number
  priceRating: number
  tourOperatorRating: number
  amenitiesRating: number
  clerkId: string
  tourPackageId: string
}