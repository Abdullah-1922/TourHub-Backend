import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import rateLimit from "express-rate-limit";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
// import paymentWebhookHandler from "./app/payment/payment-web-hook";
import { paymentController } from "./app/payment/payment";

const app: Application = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: "Too many requests from this IP, please try again after one minute.",
  handler: (req, res, next, options) => {
    res.status(429).json({
      error: "Too Many Requests",
      message: options.message,
    });
  },
});

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", limiter);
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000","https://tour-hub-frontend.vercel.app"],
    credentials: true,
  })
);

// Clerk authentication
app.use(ClerkExpressWithAuth());

// Main Routes
app.use("/api/v1", router);

// Payment-related Routes
app.post("/api/v1/create-checkout-session", paymentController);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TourHub code");
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
