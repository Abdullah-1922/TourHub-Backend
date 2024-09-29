import { Schema, model,  } from 'mongoose';
import { TBooking } from './booking.interface';


const bookingSchema = new Schema<TBooking>({
    clerkId: { type: String, required: true },
    packageId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, required: true },
    stripeSessionId: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Booking = model<TBooking>('Booking', bookingSchema);

export default Booking;