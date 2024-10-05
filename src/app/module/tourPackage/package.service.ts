import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Comment } from "../comment/comment.model";
import { User } from "../User/user.model";
import { TPackage, TRating } from "./package.interface";
import { Package } from "./package.model";
import Booking from "../Booking/booking.model";

const createPackage = async (payload: Partial<TPackage>) => {
  const userByClerk = await User.findOne({ clerkId: payload.clerkId });

  if (!userByClerk) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid clerkId");
  }
  payload.user = userByClerk._id;
  const res = await Package.create(payload);
  return res;
};
const getAllPackage = async (query: Record<string, unknown>) => {
  if (query?.category) {
    query.category = (query.category as string).split(",");
  }

  const tourPackageQuery = new QueryBuilder(
    Package.find({ isDeleted: false }).populate("category"),
    query
  )
    .search(["country", "location"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await tourPackageQuery.modelQuery;
  const meta = await tourPackageQuery.countTotal();
  return { result, meta };
};
const getSinglePackage = async (id: string, query: Record<string, unknown>) => {
  const tourPackageQuery = new QueryBuilder(
    Package.find({ isDeleted: false, _id: id }).populate("category"),
    query
  )

    .sort()

    .fields();
  const result = await tourPackageQuery.modelQuery;

  return result[0];
};
const updatePackage = async (id: string, payload: Partial<TPackage>) => {
  const tourPackage = await Package.findById(id);
  if (!tourPackage) {
    throw new AppError(404, "Tour package not found");
  }
  const result = await Package.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deletePackage = async (id: string) => {
  const tourPackage = await Package.findById(id);
  if (!tourPackage) {
    throw new AppError(404, "Tour package not found");
  }

  const result = await Package.findByIdAndDelete(id, { new: true });
  if (result) {
    await Comment.deleteMany({ tourPackageId: id });
  }

  return result;
};
const deleteBulkPackages = async (ids: string[]) => {
  const results = [];

  for (const id of ids) {
    const tourPackage = await Package.findById(id);
    if (!tourPackage) {
      throw new AppError(404, `Tour package with id ${id} not found`);
    }

    const result = await Package.findByIdAndDelete(id);
    if (result) {
      await Comment.deleteMany({ tourPackageId: id });
      results.push(result);
    }
  }

  return results;
};
const createRating = async (payload: TRating) => {
  const {
    amenitiesRating,
    clerkId,
    foodRating,
    locationRating,
    priceRating,
    roomRating,
    tourOperatorRating,
    tourPackageId,
  } = payload;

  const packageData = await Package.findById(tourPackageId);
  if (!packageData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid Package Id");
  }
  const userData = await User.findOne({ clerkId: clerkId });
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid clerk Id");
  }

  const ratingData = packageData.rating;

  const existingRating = ratingData.find(
    (rating) => rating.clerkId === clerkId
  );
  if (existingRating) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Rating from this clerk already exists."
    );
  }

  if (ratingData.length === 0) {
    // If this is the first rating, set the averages based on this rating directly
    packageData.averageLocationRating = locationRating;
    packageData.averageFoodRating = foodRating;
    packageData.averageRoomRating = roomRating;
    packageData.averagePriceRating = priceRating;
    packageData.averageTourOperatorRating = tourOperatorRating;
    packageData.averageAmenitiesRating = amenitiesRating;

    // Calculate total average rating based on the initial rating
    const totalAverageRating = parseFloat(
      (
        (locationRating +
          foodRating +
          roomRating +
          priceRating +
          tourOperatorRating +
          amenitiesRating) /
        6
      ).toFixed(1)
    );

    // Set the total average rating
    packageData.totalAverageRating = totalAverageRating;

    // Add new rating to the package's rating array
    packageData.rating.push(payload);
  } else {
    // Add new rating to the package's rating array
    packageData.rating.push(payload);

    // Proceed with average recalculation if there are existing ratings
    const totalRatings = packageData.rating.length;

    // Calculate new average ratings by including the newly added rating
    const sumRatings = packageData.rating.reduce(
      (acc, rating) => {
        acc.locationRating += rating.locationRating;
        acc.foodRating += rating.foodRating;
        acc.roomRating += rating.roomRating;
        acc.priceRating += rating.priceRating;
        acc.tourOperatorRating += rating.tourOperatorRating;
        acc.amenitiesRating += rating.amenitiesRating;
        return acc;
      },
      {
        locationRating: 0,
        foodRating: 0,
        roomRating: 0,
        priceRating: 0,
        tourOperatorRating: 0,
        amenitiesRating: 0,
      }
    );

    // Update individual average ratings
    packageData.averageLocationRating = parseFloat(
      (sumRatings.locationRating / totalRatings).toFixed(1)
    );
    packageData.averageFoodRating = parseFloat(
      (sumRatings.foodRating / totalRatings).toFixed(1)
    );
    packageData.averageRoomRating = parseFloat(
      (sumRatings.roomRating / totalRatings).toFixed(1)
    );
    packageData.averagePriceRating = parseFloat(
      (sumRatings.priceRating / totalRatings).toFixed(1)
    );
    packageData.averageTourOperatorRating = parseFloat(
      (sumRatings.tourOperatorRating / totalRatings).toFixed(1)
    );
    packageData.averageAmenitiesRating = parseFloat(
      (sumRatings.amenitiesRating / totalRatings).toFixed(1)
    );

    // Calculate and update the total average rating for the package
    const totalAverageRating = parseFloat(
      (
        (packageData.averageLocationRating +
          packageData.averageFoodRating +
          packageData.averageRoomRating +
          packageData.averagePriceRating +
          packageData.averageTourOperatorRating +
          packageData.averageAmenitiesRating) /
        6
      ).toFixed(1)
    );

    packageData.totalAverageRating = totalAverageRating;
  }

  // Save the updated package
  console.log(packageData);
  const result = await packageData.save();
  return result;
};

const getLocationWithCountry = async () => {
  const locationData = await Package.find({}).select(["country", "location"]);

  console.log(locationData);
  const uniqueLocations = new Set();
  const result: string[] = [];
  locationData.forEach((item) => {
    const formattedLocation = `${item.location},${item.country}`;
    if (!uniqueLocations.has(item.location)) {
      // Avoid duplicate locations
      uniqueLocations.add(item.location);
      result.push(formattedLocation);
    }
  });
  return result;
};
const getTopBookedLocations = async () => {
  try {
    // Aggregate from Bookings and join with Packages
    const topLocations = await Booking.aggregate([
      {
        // Lookup to join Bookings with Package data
        $lookup: {
          from: "packages", // The name of the Package collection
          localField: "packageId",
          foreignField: "_id",
          as: "packageInfo",
        },
      },
      {
        // Unwind the joined packageInfo array
        $unwind: "$packageInfo",
      },
      {
        // Group by location, get the count and collect an image
        $group: {
          _id: "$packageInfo.location",
          totalPackages: { $sum: 1 },
          image: { $first: "$packageInfo.cardImage" }, // Use the first image from any package in the location
        },
      },
      {
        // Sort by totalPackages in descending order
        $sort: { totalPackages: -1 },
      },
      {
        // Limit to top 10 locations
        $limit: 10,
      },
      {
        // Reshape the output to the desired structure
        $project: {
          _id: 0,
          location: "$_id",
          image: 1,
          totalPackages: 1,
        },
      },
    ]);

    return topLocations;
  } catch (error) {
    console.error("Error fetching top booked locations:", error);
    throw error;
  }
};




export const PackageServices = {
  createPackage,
  getAllPackage,
  getSinglePackage,
  updatePackage,
  deletePackage,
  getLocationWithCountry,
  createRating,
  getTopBookedLocations,
  deleteBulkPackages
};
