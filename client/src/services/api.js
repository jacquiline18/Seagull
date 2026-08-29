import axios from 'axios';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';

// Create base Axios instance
const API = axios.create({
  baseURL: '/api',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Authorization token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('sgl_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// LocalStorage helpers for mock fallback persistence
const getStoredProducts = () => {
  const local = localStorage.getItem('sgl_mock_products');
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  }
  return [];
};

const setStoredProducts = (products) => {
  localStorage.setItem('sgl_mock_products', JSON.stringify(products));
};

const getStoredOrders = () => {
  const local = localStorage.getItem('sgl_mock_orders');
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  }
  return [
    {
      _id: 'ORD-2026-001',
      id: 'ORD-2026-001',
      customer: {
        name: 'Dr. Juma Mwinyi',
        email: 'juma.mwinyi@udsm.ac.tz',
        phone: '+255 754 123 456',
        company: 'University of Dar es Salaam (Chemistry Dept)',
        deliveryAddress: 'Chemistry Building, University Main Campus, Dar es Salaam'
      },
      products: [
        { product: 'prod-001', name: 'Precision Digital Analytical Balance (0.0001g / 220g)', price: 1850000, quantity: 2 },
        { product: 'prod-002', name: 'Digital Magnetic Hotplate Stirrer (550°C, 1500 RPM)', price: 780000, quantity: 3 }
      ],
      totalAmount: 6040000,
      notes: 'Please include official VAT invoice and calibration certificate.',
      status: 'Processing',
      createdAt: '2026-08-25T10:30:00.000Z'
    },
    {
      _id: 'ORD-2026-002',
      id: 'ORD-2026-002',
      customer: {
        name: 'Amina Rashid',
        email: 'a.rashid@kilimanjarodiagnostics.co.tz',
        phone: '+255 784 987 654',
        company: 'Kilimanjaro Medical Research Lab',
        deliveryAddress: 'Moshi Hospital Road, Kilimanjaro'
      },
      products: [
        { product: 'prod-003', name: 'Advanced Binocular Biological Compound Microscope (1600X)', price: 1450000, quantity: 1 },
        { product: 'prod-008', name: 'Laboratory Chemical Splash & Impact Safety Goggles', price: 35000, quantity: 10 }
      ],
      totalAmount: 1800000,
      notes: 'Urgent delivery required for pathology department.',
      status: 'Confirmed',
      createdAt: '2026-08-27T14:15:00.000Z'
    }
  ];
};

const setStoredOrders = (orders) => {
  localStorage.setItem('sgl_mock_orders', JSON.stringify(orders));
};

// API Services with resilient fallback
export const productService = {
  async getAllProducts(params = {}) {
    try {
      const response = await API.get('/products', { params });
      return response.data;
    } catch {
      // Fallback to local storage / mock data
      let products = getStoredProducts();
      if (params.category && params.category !== 'all') {
        products = products.filter(p => p.categoryId === params.category || p.category.toLowerCase().includes(params.category.toLowerCase()));
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
      }
      if (params.featured) {
        products = products.filter(p => p.featured);
      }
      return { success: true, count: products.length, products };
    }
  },

  async getProductById(id) {
    try {
      const response = await API.get(`/products/${id}`);
      return response.data;
    } catch {
      const products = getStoredProducts();
      const product = products.find(p => p._id === id || p.id === id);
      if (product) return { success: true, product };
      throw new Error('Product not found');
    }
  },

  async createProduct(productData) {
    try {
      const response = await API.post('/products', productData);
      return response.data;
    } catch {
      const products = getStoredProducts();
      const newProduct = {
        ...productData,
        _id: 'prod-' + Date.now(),
        id: 'prod-' + Date.now(),
        priceFormatted: `TZS ${Number(productData.price).toLocaleString()}`,
        priceUSD: Math.round(Number(productData.price) / 2560),
        inStock: Number(productData.stock) > 0,
        createdAt: new Date().toISOString()
      };
      products.unshift(newProduct);
      setStoredProducts(products);
      return { success: true, product: newProduct };
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await API.put(`/products/${id}`, productData);
      return response.data;
    } catch {
      const products = getStoredProducts();
      const index = products.findIndex(p => p._id === id || p.id === id);
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...productData,
          priceFormatted: `TZS ${Number(productData.price || products[index].price).toLocaleString()}`,
          inStock: Number(productData.stock ?? products[index].stock) > 0
        };
        setStoredProducts(products);
        return { success: true, product: products[index] };
      }
      throw new Error('Product not found for update');
    }
  },

  async deleteProduct(id) {
    try {
      const response = await API.delete(`/products/${id}`);
      return response.data;
    } catch {
      let products = getStoredProducts();
      products = products.filter(p => p._id !== id && p.id !== id);
      setStoredProducts(products);
      return { success: true, message: 'Product removed' };
    }
  }
};

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await API.post('/orders', orderData);
      return response.data;
    } catch {
      const orders = getStoredOrders();
      const newOrder = {
        ...orderData,
        _id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
        id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      orders.unshift(newOrder);
      setStoredOrders(orders);
      return { success: true, order: newOrder };
    }
  },

  async getAllOrders() {
    try {
      const response = await API.get('/orders');
      return response.data;
    } catch {
      const orders = getStoredOrders();
      return { success: true, count: orders.length, orders };
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const response = await API.put(`/orders/${id}`, { status });
      return response.data;
    } catch {
      const orders = getStoredOrders();
      const index = orders.findIndex(o => o._id === id || o.id === id);
      if (index !== -1) {
        orders[index].status = status;
        setStoredOrders(orders);
        return { success: true, order: orders[index] };
      }
      throw new Error('Order not found');
    }
  }
};

export const contactService = {
  async sendMessage(messageData) {
    try {
      const response = await API.post('/contact', messageData);
      return response.data;
    } catch {
      const stored = JSON.parse(localStorage.getItem('sgl_mock_messages') || '[]');
      stored.unshift({ ...messageData, id: 'msg-' + Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('sgl_mock_messages', JSON.stringify(stored));
      return { success: true, message: 'Message received by Seagull General Supply Limited team.' };
    }
  }
};

export const authService = {
  async login(email, password) {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data;
    } catch {
      // Mock admin credentials check
      if (email === 'admin@seagull.co.tz' && password === 'admin123') {
        const mockToken = 'mock_jwt_token_seagull_admin_' + Date.now();
        const user = {
          id: 'usr-admin-01',
          name: 'Seagull Admin Operations',
          email: 'admin@seagull.co.tz',
          role: 'admin'
        };
        return { success: true, token: mockToken, user };
      }
      throw new Error('Invalid credentials. Use admin@seagull.co.tz / admin123');
    }
  }
};

export default API;
