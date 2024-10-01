import { Schema, model } from "mongoose";
import { TStripeUser, TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user","superadmin"],
      default: "user",
    },
    image: {
      type: String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);


const stripeUserSchema = new Schema<TStripeUser>(
  {
    clerkId: {
      type: String,
      required: true,
   
    },
    customerId: {
      type: String,
      required: true,
     
    },
    
  },
  {
    timestamps: true,
  }
);

export const StripeUser = model<TStripeUser>("StripeUser", stripeUserSchema);
