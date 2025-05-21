import express from 'express';
import * as shortUrlController from '../controllers/shortUrl.controllers.js';
const router = express.Router();

router.post("/create", shortUrlController.createShortUrl);


export default router;