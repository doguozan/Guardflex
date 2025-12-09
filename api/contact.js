// Vercel Serverless Function for Contact Form API
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

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

// Use existing model or create new one
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, message, subject } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: 'Missing required fields: name, email, message' 
        });
      }

      // Connect to MongoDB
      await connectDB();

      // Get IP address
      const ipAddress = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';

      // Save to database
      const contactSubmission = await Contact.create({
        name,
        email,
        phone,
        message,
        subject,
        ipAddress,
        status: 'new'
      });

      return res.status(200).json({ 
        success: true,
        message: 'Contact form submitted successfully',
        id: contactSubmission._id
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ error: 'Failed to submit contact form', message: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      await connectDB();
      const { status } = req.query;
      const query = status ? { status } : {};
      const contacts = await Contact.find(query).sort({ createdAt: -1 }).limit(100);
      return res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
