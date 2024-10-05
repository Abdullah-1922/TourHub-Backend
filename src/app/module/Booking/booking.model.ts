import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    clerkId: { type: String, required: true },
    packageId: { type: Schema.Types.ObjectId, ref:"Package",required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    transactionId: { type: String, required: true },
    invoiceId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    packageName:{ type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Booking = model<TBooking>("Booking", bookingSchema);

export default Booking;

