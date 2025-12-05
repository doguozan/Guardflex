// Product Model
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Insektenschutz', 'Sonnenschutz', 'Plissee'],
    index: true
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
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for faster queries
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' }); // Text search

const Product = mongoose.model('Product', productSchema);

export default Product;

