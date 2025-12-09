// Vercel Serverless Function for Products API
// MongoDB integration for Vercel

import mongoose from 'mongoose';

// MongoDB connection (cached)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Insektenschutz', 'Sonnenschutz', 'Plissee']
  },
  image: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Use existing model or create new one
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Connect to MongoDB
    await connectDB();

    if (req.method === 'GET') {
      // Get all products or filter by category
      const { category } = req.query;
      
      const query = category && category !== 'Alle' ? { category } : {};
      const products = await Product.find(query).sort({ createdAt: -1 });
      
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      // Add new product (admin only - add auth later)
      const newProduct = await Product.create(req.body);
      return res.status(201).json(newProduct);
    }

    if (req.method === 'PUT') {
      // Update product (admin only)
      const { id } = req.query;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    }

    if (req.method === 'DELETE') {
      // Delete product (admin only)
      const { id } = req.query;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted', product: deletedProduct });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
