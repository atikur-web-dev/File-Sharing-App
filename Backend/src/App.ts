import express, { type Request, type Response } from "express";

// Routes
import authRoute from "./Routes/auth.route.ts";

// Error Handler
import { errorHandler } from "./Middlewares/errorHandler.ts";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./Config/config.ts";

const App = express();

//Middlewares(build-it)
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(express.static("public"));

//Middlewares
App.use(helmet());
App.use(
  cors({
    origin: [
      "http://localhost:3000", // React default prot
      "http://localhost:5173",
      config.APP_URL, // Vite default port
    ],

    credentials: true,
  }),
);
App.use(cookieParser());

// Health Check Route
App.get("/health", (_req: Request, res: Response) => {
  res.json({ message: "All Okay" });
});

// Api routes
App.use("/api/v1", authRoute);

// If no routes found
App.use((_req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
App.use(errorHandler);

export default App;
