import { z } from "zod";

const CreatePackageValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: "User Id is required" }).min(2).max(255),
    name: z
      .string({ required_error: "Package Name is required" })
      .min(2)
      .max(255),
    startDate: z.string({ required_error: "Start Date is required" }),
    endDate: z.string({ required_error: "End Date is required" }),
    price: z.number({ required_error: "Price is required" }),
    totalPeople: z.string({ required_error: "Total People is required" }),
    description: z.string({ required_error: "Description is required" }),
    cardImage: z.string({ required_error: "Card Image is required" }),
    bannerImage: z.array(
      z.string({ required_error: "Banner Image is required" })
    ),
    features: z.object({
      include: z.array(z.string({ required_error: "Include is required" })),
      exclude: z.array(z.string({ required_error: "Exclude is required" })),
    }),
    category: z.array(
      z.string({ required_error: "Category is required" }).min(1)
    ),
    country: z.string({ required_error: "Country is required" }),
    location: z.string({ required_error: "Location is required" }),
  }),
});

export const PackageValidation = {
  CreatePackageValidationSchema,
};
