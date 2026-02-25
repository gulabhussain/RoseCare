import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

const app = express();

// Load environment variables
dotenv.config();

// ✅ Database Connection (Safe for Serverless)
dbConnection();

// ✅ CORS Configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File Upload (Vercel Safe → /tmp only)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  })
);

// ✅ Health Check Route (VERY IMPORTANT for Vercel testing)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management Backend Running 🚀",
  });
});

// ✅ API Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// ❌ Handle Unknown Routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ✅ Error Middleware (Always Last)
app.use(errorMiddleware);

export default app;