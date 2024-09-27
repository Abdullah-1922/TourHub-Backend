import { z } from "zod";

const createCommentValidation = z.object({
  body: z.object({
    clerkId: z.string().min(1, "clerkId is required"),
    tourPackageId: z.string().min(1, "Tour Package ID is required"),
    title: z.string({required_error:"Title is required"}),
    // locationRating: z
    //   .number()
    //   .min(1, "Rating must be at least 0")
    //   .max(5, "Rating cannot exceed 5"),
    // foodRating: z
    //   .number()
    //   .min(1, "Rating must be at least 0")
    //   .max(5, "Rating cannot exceed 5"),
    // roomRating: z
    //   .number()
    //   .min(1, "Rating must be at least 0")
    //   .max(5, "Rating cannot exceed 5"),
    // priceRating: z
    //   .number()
    //   .min(1, "Rating must be at least 0")
    //   .max(5, "Rating cannot exceed 5"),
    // tourOperatorRating: z
    //   .number()
    //   .min(1, "Rating must be at least 0")
    //   .max(5, "Rating cannot exceed 5"),
    // amenitiesRating: z
    //   .number()
    //   .min(1, "Rating must be at least 0")
    //   .max(5, "Rating cannot exceed 5"),

    comment: z.string().min(1, "Comment is required"),
    images: z.array(z.string()).optional(),
  }),
});
export const CommentValidation = {
  createCommentValidation,
};
