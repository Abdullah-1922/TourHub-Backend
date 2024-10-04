import { Types } from "mongoose";

export type TBooking = {
  clerkId: string;
  packageId: Types.ObjectId;
  amount: number;
  paymentStatus: string;
  transactionId:string;
  email:string;
  name:string;
  invoiceId:string;
  packageName:string;

};
