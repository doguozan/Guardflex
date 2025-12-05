// Express Router for Products
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products or filter by category
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};
    
    if (category && category !== 'Alle') {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create new product (admin only - add auth later)
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Product with this ID already exists' });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT update product (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE product (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id });
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export { router as productsRouter };

