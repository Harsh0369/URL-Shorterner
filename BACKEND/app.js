import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import shortUrlRoute from './src/routes/shortUrlRoute.js';
import { redirectFromShortUrl } from './src/controllers/shortUrl.controllers.js';
import { errorHandler } from './src/utils/errorHandler.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", shortUrlRoute);


app.get("/api/:shortUrl", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});