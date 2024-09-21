import { PackageRoutes } from "./../module/tourPackage/package.route";
import { Router } from "express";
import { UserRoutes } from "../module/User/user.route";
import { CommentRoutes } from "../module/comment/comment.route";

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
    path: "/comment",
    route: CommentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
