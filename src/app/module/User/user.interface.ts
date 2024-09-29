export interface TUser {
  clerkId: string;
  email?: string;
  name: string;
  role: "admin" | "user";
  isDeleted: boolean;
  image?: string;
}
