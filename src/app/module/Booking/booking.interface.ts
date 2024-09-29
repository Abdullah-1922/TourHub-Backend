export type TBooking = {
  clerkId: string;
  packageId: string;
  amount: number;
  paymentStatus: string;
  stripeSessionId: string;
  bookingDate: Date;
};
