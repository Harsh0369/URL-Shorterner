import express from 'express';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/shortUrlModel.js';
import shortUrlRoute from './src/routes/shortUrlRoute.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", shortUrlRoute);


app.get("/api/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const url = await urlSchema.findOne({ shortUrl });
  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }
  url.clicks += 1;
  await url.save();
  res.redirect(url.originalUrl);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});