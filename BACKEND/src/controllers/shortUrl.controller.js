import * as shortUrlService from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { originalUrl } = req.body;
  if (req.user) {
    
    const shortUrl = await shortUrlService.createShortUrl(originalUrl);
  } else {  
    const shortUrl = await shortUrlService.createShortUrlWithUser(
      originalUrl,
      req.user._id
    );
  }
  res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { shortUrl } = req.params;
  const url = await shortUrlService.getUrl(shortUrl);
  if (!url) throw new Error("URL not found");
  url.clicks += 1;
  await url.save();
  res.redirect(url.originalUrl);
});

export const customShortUrl = wrapAsync(async (req, res) => {
  const { originalUrl, slug } = req.body;
  const shortUrl = await shortUrlService.createCustomShortUrl(
    originalUrl,
    userId,
    slug=null
  );
  res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
});
