import app from "./app.js";
import serverless from "serverless-http";
import { dbConnection } from "./database/dbConnection.js";
import cloudinary from "cloudinary";

// Connect Database
await dbConnection();

// Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default serverless(app);