import express from 'express';
import { nanoid } from 'nanoid';
import urlSchema from '../models/shortUrlModel.js';

export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const shortUrl = nanoid(10);

  const newUrl = new urlSchema({
    originalUrl,
    shortUrl,
  });
  newUrl.save();
  res.send({ originalUrl, shortUrl });
};