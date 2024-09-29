import { Router } from "express";
import { BookingControllers } from "./booking.controller";

const route = Router();

route.get("/", BookingControllers.getAllBooking);

export const BookingRoutes = route;
