import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import rateLimit from "express-rate-limit";
const app: Application = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: "Too many request from this IP,please try again after one minute.",
  handler: (req, res, next, options) => {
    res.status(429).json({
      error: "Too Many Requests",
      message: options.message,
    });
  },
});

//parsers

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", limiter);
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TourHub code");
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
