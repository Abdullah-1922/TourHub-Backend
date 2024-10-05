import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import Booking from "./booking.model";
import { Package } from "../tourPackage/package.model";
import { User } from "../User/user.model";
import { TBooking } from "./booking.interface";
import { generateInvoiceId } from "./booking.utils";

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

 payload.invoiceId = generateInvoiceId()
payload.name=userByClerk.name
payload.email =userByClerk.email
payload.packageName=packageById.name
  const res = await Booking.create(payload);
  return res;
};

const bookingInfoByInvoice=async(invoiceId:string)=>{
  const result =await Booking.findOne({invoiceId:invoiceId})
  return result
}


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
// const monthlySales = async () => {
//   // Get the current year
//   const currentYear = new Date().getFullYear();

//   // Aggregate the sales data for each month
//   const monthlySalesData = await Booking.aggregate([
//     {
//       // Filter to get bookings for the current year
//       $match: {
//         createdAt: {
//           $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
//           $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
//         },
//       },
//     },
//     {
//       // Extract the month from createdAt and add it as a new field
//       $addFields: {
//         month: { $month: "$createdAt" },
//       },
//     },
//     {
//       // Group by the extracted month and calculate the total sell and booked count
//       $group: {
//         _id: "$month",
//         totalSell: { $sum: "$amount" },
//         totalBooked: { $sum: 1 },
//       },
//     },
//     {
//       // Sort by month in ascending order
//       $sort: { _id: 1 },
//     },
//   ]);

//   // Create an array of months to map the results
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Prepare the final chart data with all 12 months
//   const chartData = months.map((month, index) => {
//     const monthData = monthlySalesData.find((data) => data._id === index + 1);
//     return {
//       month,
//       sell: monthData ? monthData.totalSell : 0,
//       booked: monthData ? monthData.totalBooked : 0,
//     };
//   });
//   return chartData;
// };

const monthlySales = async () => {
  // Get the current date and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Aggregate the sales data for the current year
  const monthlySalesData = await Booking.aggregate([
    {
      // Filter to get bookings for the current year
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
          $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`),
        },
      },
    },
    {
      // Extract the month from createdAt and add it as a new field
      $addFields: {
        month: { $month: "$createdAt" },
      },
    },
    {
      // Group by the extracted month and calculate the total sell and booked count
      $group: {
        _id: "$month",
        totalSell: { $sum: "$amount" },
        totalBooked: { $sum: 1 },
      },
    },
    {
      // Sort by month in ascending order
      $sort: { _id: 1 },
    },
  ]);

  // Create an array of months to map the results
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Prepare the final chart data with all 12 months
  const chartData = months.map((month, index) => {
    const monthData = monthlySalesData.find((data) => data._id === index + 1);
    return {
      month,
      sell: monthData ? monthData.totalSell : 0,
      booked: monthData ? monthData.totalBooked : 0,
    };
  });

  // Get the current month and the previous month data
  const currentMonthIndex = currentDate.getMonth(); // 0-based index (January is 0)
  const lastMonthIndex =
    currentMonthIndex - 1 >= 0 ? currentMonthIndex - 1 : null;

  const currentMonthData = chartData[currentMonthIndex];
  const lastMonthData =
    lastMonthIndex !== null ? chartData[lastMonthIndex] : null;

  // Comparison logic
  let comparison = {};
  if (lastMonthData) {
    const sellChange = currentMonthData.sell - lastMonthData.sell;
    const bookedChange = currentMonthData.booked - lastMonthData.booked;

    comparison = {
      sell: lastMonthData.sell,
      booked: lastMonthData.booked,
      sellStatus: sellChange >= 0 ? "increase" : "decrease",
      sellPercentage: lastMonthData.sell
        ? Math.abs((sellChange / lastMonthData.sell) * 100).toFixed(1)
        : currentMonthData.sell > 0
          ? 100
          : 0,
      bookStatus: bookedChange >= 0 ? "increase" : "decrease",
      bookPercentage: lastMonthData.booked
        ? Math.abs((bookedChange / lastMonthData.booked) * 100).toFixed(1)
        : currentMonthData.booked > 0
          ? 100
          : 0,
    };
  }

  return {
    chartData,
    comparison,
  };
};
export const BookingService = {
  getAllBooking,
  alreadyBooked,
  createBooking,
  bookingByUser,
  getBasicStats,
  monthlySales,
  bookingInfoByInvoice
};
