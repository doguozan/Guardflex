// Express Backend Server
// Run with: npm run server or node server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './server/config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import { productsRouter } from './server/routes/products.js';
import { contactRouter } from './server/routes/contact.js';
import { adminRouter } from './server/routes/admin.js';

// Routes
app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;

