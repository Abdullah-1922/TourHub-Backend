import { z } from "zod";

const CreateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(2).max(255),
    clerkId: z.string({ required_error: "clerkId is required" }),
    email: z.string({ invalid_type_error: "Invalid type" }).email().optional(),
    image: z.string({ invalid_type_error: "Invalid type" }).optional(),
  }),
});

export const UserValidation = {
  CreateUserValidationSchema,
};
