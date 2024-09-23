export interface TUser {
  clerkId: string;
  email?: string;
  name: string;
  role: "admin" | "user" | "guide";
  isDeleted: boolean;
  image?: string;
}
