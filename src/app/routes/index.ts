import { PackageRoutes } from "./../module/tourPackage/package.route";
import { Router } from "express";
import { UserRoutes } from "../module/User/user.route";
import { NewsRouter } from "../module/News/news.route";
import { CommentRoutes } from "../module/comment/comment.route";
import { CategoryRoutes } from "../module/category/category.route";
import { BookingRoutes } from "../module/Booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/package",
    route: PackageRoutes,
  },
  {
    path: "/news",
    route: NewsRouter,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
