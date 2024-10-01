export interface TUser {
  clerkId: string;
  email?: string;
  name: string;
  role: "admin" | "user"| "superadmin";
  isDeleted: boolean;
  image?: string;
}
export interface TStripeUser {
  clerkId: string;
  customerId: string;
}
 