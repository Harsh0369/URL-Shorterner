import * as shortUrlService from '../services/shortUrl.services.js';


export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = await shortUrlService.createShortUrl(originalUrl);
  res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
 
};