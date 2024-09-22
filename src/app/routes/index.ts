import { PackageRoutes } from "./../module/tourPackage/package.route";
import { Router } from "express";
import { UserRoutes } from "../module/User/user.route";
import { CommentRoutes } from "../module/comment/comment.route";
import { CategoryRoutes } from "../module/category/category.route";

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
  {
    path: "/category",
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
