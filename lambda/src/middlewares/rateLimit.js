import { rateLimit as expressRateLimit } from 'express-rate-limit';

const TIME = 60 * 30 * 1000; // 0.5 hour

export const rateLimit = expressRateLimit({
  windowMs: TIME,
  limit: 5, // Limit each IP to 5 create account requests per `window` per TIME
  message:
    'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
