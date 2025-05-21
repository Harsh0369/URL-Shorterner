import { nanoid } from "nanoid";
import * as shortUrlDao from "../dao/shortUrl.dao.js";

export const createShortUrl = async (url) => {
  if (!url) {
    return res.status(400).json({ error: "Original URL is required" });
  }

    const shortUrl = nanoid(7);
    await shortUrlDao.saveUrl(shortUrl, url);
    return shortUrl;
};

export const createShortUrlWithUser = async (url,userId) => {
  if (!url) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const shortUrl = nanoid(7);
  await shortUrlDao.saveUrl(shortUrl, url,userId);
  return shortUrl;
};
  