import { z } from "zod";

const NewsValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: "User Id is required" }).min(2).max(255),
    newsCategory: z.string({ required_error: "News Category is required" }),
    title: z.string({ required_error: "Title is required" }),
    description: z.string({ invalid_type_error: "Description is required" }),
    images: z.string({ invalid_type_error: "Invalid type" }),
  }),
});

export const NewsValidation = {
  NewsValidationSchema,
};
