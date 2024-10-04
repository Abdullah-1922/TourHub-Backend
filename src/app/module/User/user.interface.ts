export interface TUser {
  clerkId: string;
  email?: string;
  name: string;
  role: "admin" | "user"| "superadmin";
  isDeleted: boolean;
  image?: string;
  createdAt: Date;
}
export interface TStripeUser {
  clerkId: string;
  customerId: string;
}
 