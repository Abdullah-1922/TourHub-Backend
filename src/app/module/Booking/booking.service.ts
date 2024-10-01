import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Booking from "./booking.model";
import { Package } from "../tourPackage/package.model";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";

const getAllBooking = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate({
      path: "packageId",
      model: Package,
      select: "name",
    }),
    query
  )
    .search(["clerkId"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const metadata = await bookingQuery.countTotal();

  const result = (await bookingQuery.modelQuery) as Array<
    InstanceType<typeof Booking> & { toObject: () => TBooking }
  >;

  // Map the results to include package name
  const bookingsWithPackageNames = result.map((booking) => ({
    ...booking.toObject(), // Convert Mongoose Document to plain object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    packageName: (booking.packageId as any)?.name || null, // Add package name from the populated data
  }));

  return { result: bookingsWithPackageNames, metadata };
};

const bookingByUser = async (id: string, query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find({ clerkId: id }).populate({
      path: "packageId",
      model: Package,
      select: "name",
    }),
    query
  )
    .search(["clerkId"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const metadata = await bookingQuery.countTotal();

  const result = (await bookingQuery.modelQuery) as Array<
    InstanceType<typeof Booking> & { toObject: () => TBooking }
  >;

  // Map the results to include package name
  const bookingsWithPackageNames = result.map((booking) => ({
    ...booking.toObject(), // Convert Mongoose Document to plain object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    packageName: (booking.packageId as any)?.name || null, // Add package name from the populated data
  }));

  return { result: bookingsWithPackageNames, metadata };
};

const alreadyBooked = async (payload: {
  packageId: string;
  clerkId: string;
}) => {
  if (!payload.packageId || !payload.clerkId) {
    throw new AppError(400, "Package ID and Clerk ID are required");
  }

  const result = await Booking.findOne(payload);

  if (result) {
    throw new AppError(400, "You have already booked this package");
  }

  return { message: "You can book this package" };
};

const createBooking = async (payload: Partial<TBooking>) => {
  const userByClerk = await User.findOne({ clerkId: payload.clerkId });
  const packageById = await Package.findOne({ _id: payload.packageId });
  if (!userByClerk) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid clerkId");
  }
  if (!packageById) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid packageId");
  }
  payload.clerkId = userByClerk.clerkId;
  payload.packageId = packageById._id;

  const res = await Booking.create(payload);
  return res;
};

const getBasicStats = async () => {
  const totalBookings = await Booking.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalPrice = await Booking.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  return {
    totalBookings,
    totalUsers,
    totalPrice: totalPrice[0]?.total || 0,
  };
};

export const BookingService = {
  getAllBooking,
  alreadyBooked,
  createBooking,
  bookingByUser,
  getBasicStats,
};
