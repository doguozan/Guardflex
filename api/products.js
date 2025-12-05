// Vercel Serverless Function for Products API
// Note: For now using static data, will be replaced with database later

const productsData = [
  // Products will be loaded from database in production
];

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get all products or filter by category
      const { category } = req.query;
      
      // TODO: Load from database
      // const products = await Product.find(category ? { category } : {});
      
      if (category) {
        const filteredProducts = productsData.filter(p => p.category === category);
        return res.status(200).json(filteredProducts);
      }
      
      return res.status(200).json(productsData);
    }

    if (req.method === 'POST') {
      // Add new product (admin only - add auth later)
      const newProduct = req.body;
      // TODO: Save to database
      // const product = await Product.create(newProduct);
      return res.status(201).json({ message: 'Product added', product: newProduct });
    }

    if (req.method === 'PUT') {
      // Update product (admin only)
      const { id } = req.query;
      const updatedProduct = req.body;
      // TODO: Update in database
      // const product = await Product.findByIdAndUpdate(id, updatedProduct);
      return res.status(200).json({ message: 'Product updated', product: updatedProduct });
    }

    if (req.method === 'DELETE') {
      // Delete product (admin only)
      const { id } = req.query;
      // TODO: Delete from database
      // await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Product deleted' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

