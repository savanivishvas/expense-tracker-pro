import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor for error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const expenseService = {
  getAll: (params = {}) => api.get('/expenses', { params }).then(r => r.data),
  getById: (id) => api.get(`/expenses/${id}`).then(r => r.data),
  create: (data) => api.post('/expenses', data).then(r => r.data),
  update: (id, data) => api.put(`/expenses/${id}`, data).then(r => r.data),
  delete: (id) => api.delete(`/expenses/${id}`).then(r => r.data),
  getSummary: () => api.get('/expenses/summary').then(r => r.data),
};

export const CATEGORIES = [
  'Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'
];

export const CATEGORY_COLORS = {
  Food:          '#f59e0b',
  Travel:        '#0ea5e9',
  Shopping:      '#8b5cf6',
  Bills:         '#ef4444',
  Entertainment: '#10b981',
  Health:        '#f97316',
  Other:         '#6b7280',
};
