// Express Backend Server
// Run with: npm run server or node server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './server/config/database.js';
import { productsRouter } from './server/routes/products.js';
import { contactRouter } from './server/routes/contact.js';
import { adminRouter } from './server/routes/admin.js';
import { siteRouter } from './server/routes/site.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

connectDB();

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
  : null;

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: corsOrigins && corsOrigins.length > 0 ? corsOrigins : true,
    credentials: false,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api/site', siteRouter);

const contactSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again later.' },
});

app.use('/api/contact', (req, res, next) => {
  if (req.method === 'POST' && req.path === '/') {
    return contactSubmitLimiter(req, res, next);
  }
  next();
});
app.use('/api/contact', contactRouter);

app.use('/api/admin', (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    return adminLoginLimiter(req, res, next);
  }
  next();
});
app.use('/api/admin', adminRouter);

app.use('/api/products', productsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
