import * as shortUrlService from '../services/shortUrl.services.js';
import wrapAsync from '../utils/tryCatchWrapper.js';


export const createShortUrl = wrapAsync(async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = await shortUrlService.createShortUrl(originalUrl);
  res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
 
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { shortUrl } = req.params;
  const url = await shortUrlService.getUrl(shortUrl);
  if(!url) throw new Error("URL not found");
  url.clicks += 1;
  await url.save();
  res.redirect(url.originalUrl);
});