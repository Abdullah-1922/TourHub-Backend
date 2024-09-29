import { QueryBuilder } from "../../builder/QueryBuilder";
import Booking from './booking.model';

const getAllBooking = async (query:Record<string,unknown>) => {

const bookingQuery=new QueryBuilder(Booking.find().populate(["clerkId","packageId"]),query)
.search(["clerkId","packageId"])
.filter()
.sort()
.paginate()
.fields();

const metadata=await bookingQuery.countTotal();
 const result = await bookingQuery.modelQuery;
return {result,metadata};
}

export const  BookingService = {   
    getAllBooking
}