import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/mongo.config.js";
import shortUrlRoute from "./src/routes/shortUrlRoute.js";
import authRoute from "./src/routes/authRoutes.js";
import { redirectFromShortUrl } from "./src/controllers/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api", shortUrlRoute);

app.get("/api/:shortUrl", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
