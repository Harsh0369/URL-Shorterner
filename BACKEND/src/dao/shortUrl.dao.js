import urlSchema from '../models/shortUrlModel.js';
export const saveUrl = async (shortUrl, originalUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      originalUrl,
      shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (err) {
      console.error(err);
    // if (err.code == 11000) {
    //   throw new ConflictError("Short URL already exists");
    // }
    // throw new Error(err);
  }
};

