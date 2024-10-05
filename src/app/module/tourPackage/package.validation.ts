import { z } from "zod";

const CreatePackageValidationSchema = z.object({
  body: z
    .object({
      clerkId: z.string({ required_error: "User Id is required" }).min(2).max(255),
      name: z
        .string({ required_error: "Package Name is required" })
        .min(2)
        .max(255),
      startDate: z
        .string({ required_error: "Start Date is required" })
        .refine(
          (date) => {
            const regex =
              /^(?:(?:19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
          },
          { message: "Invalid date format, expected 'YYYY-MM-DD'" }
        ),
      endDate: z
        .string({ required_error: "End Date is required" })
        .refine(
          (date) => {
            const regex =
              /^(?:(?:19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            return regex.test(date);
          },
          { message: "Invalid date format, expected 'YYYY-MM-DD'" }
        ),
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
      itinerary: z.array(z.object({day:z.string({ required_error: "day is required" }),title:z.string({ required_error: "title is required" }),description:z.string({ required_error: "description is required" })})) ,
      tourDuration:z.string({required_error:"Tour duration is required"}),
      mapLocation:z.string({required_error:"MapLocation is required"}),
      guideName:z.string({required_error:"guideName is required"}),
      guideContact:z.string({required_error:"guideContact is required"}),
      pickUpLocation:z.string({required_error:"pickUpLocation is required"}),
      pickUpTime:z.string({required_error:"PickUpTime is required"}),
      published:z.boolean().optional(),
      category: z.array(
        z.string({ required_error: "Category is required" }).min(1)
      ),
      country: z.string({ required_error: "Country is required" }),
      location: z.string({ required_error: "Location is required" }),
    })
    .refine(
      (data) => new Date(data.startDate) <= new Date(data.endDate),
      {
        message: "Start date cannot be later than end date",
        path: ["endDate"], // The field that will show the error
      }
    ),
});

export const PackageValidation = {
  CreatePackageValidationSchema,
};
