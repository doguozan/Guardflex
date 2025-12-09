// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Products
  async getProducts(category = null) {
    const url = category && category !== 'Alle' 
      ? `${API_BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async getProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },

  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  async updateProduct(id, productData) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return response.json();
  },

  // Contact
  async submitContact(formData) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit contact form');
    }
    return response.json();
  },

  async getContacts(status = null) {
    const url = status 
      ? `${API_BASE_URL}/contact?status=${encodeURIComponent(status)}`
      : `${API_BASE_URL}/contact`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  },

  // Admin
  async adminLogin(credentials) {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    return response.json();
  },

  async getSettings() {
    const response = await fetch(`${API_BASE_URL}/admin/settings`);
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return response.json();
  },

  async updateSettings(settings) {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update settings');
    }
    return response.json();
  },
};

