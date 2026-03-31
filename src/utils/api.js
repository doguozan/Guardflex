// API Configuration
// Production: Use relative path for Vercel Serverless Functions
// Development: Use localhost or VITE_API_URL env variable
const getApiBaseUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in production (multiple checks for reliability)
  const isProduction = import.meta.env.PROD || 
                       import.meta.env.MODE === 'production' ||
                       (typeof window !== 'undefined' && !window.location.hostname.includes('localhost'));
  
  // In production (on Vercel), use relative path
  if (isProduction) {
    return '/api';
  }
  
  // In development, use localhost
  return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();

const ADMIN_TOKEN_KEY = 'adminToken';

function getAdminToken() {
  if (typeof sessionStorage === 'undefined') return null;
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token) {
  if (typeof sessionStorage === 'undefined') return;
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function clearAdminToken() {
  setAdminToken(null);
}

function authHeaders(jsonBody = true) {
  const headers = {};
  if (jsonBody) {
    headers['Content-Type'] = 'application/json';
  }
  const t = getAdminToken();
  if (t) {
    headers['Authorization'] = `Bearer ${t}`;
  }
  return headers;
}

export const api = {
  /** Öffentliche Site-Daten (ohne Admin-Token) */
  async getSiteContent() {
    const response = await fetch(`${API_BASE_URL}/site`);
    if (!response.ok) {
      throw new Error('Failed to load site content');
    }
    return response.json();
  },

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
    const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(false),
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
    
    const response = await fetch(url, { headers: authHeaders(false) });
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
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Login failed');
    }
    return response.json();
  },

  async adminMe() {
    const response = await fetch(`${API_BASE_URL}/admin/me`, {
      headers: authHeaders(false),
    });
    if (!response.ok) {
      throw new Error('Session invalid');
    }
    return response.json();
  },

  async getSettings() {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      headers: authHeaders(false),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return response.json();
  },

  async updateSettings(settings) {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update settings');
    }
    return response.json();
  },
};

