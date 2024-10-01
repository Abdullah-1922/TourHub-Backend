import { Router } from "express";
import { BookingControllers } from "./booking.controller";

const route = Router();

route.get("/", BookingControllers.getAllBooking);
route.post("/", BookingControllers.createBooking);
route.post("/already-book", BookingControllers.alreadyBooked);
route.get("/stats/basic-stats", BookingControllers.getBasicStats);
route.get("/:id", BookingControllers.bookingByUser);

export const BookingRoutes = route;
