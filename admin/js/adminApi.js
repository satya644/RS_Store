
const auth = {
  getToken() { return localStorage.getItem('sj_admin_token'); },
  setToken(token) { localStorage.setItem('sj_admin_token', token); },
  getAdmin() { return JSON.parse(localStorage.getItem('sj_admin') || 'null'); },
  setAdmin(admin) { localStorage.setItem('sj_admin', JSON.stringify(admin)); },
  logout() {
    localStorage.removeItem('sj_admin_token');
    localStorage.removeItem('sj_admin');
    window.location.href = 'login.html';
  },
  requireAuth() {
    if (!auth.getToken()) window.location.href = 'login.html';
  },
};

function authHeaders(extra = {}) {
  return { Authorization: `Bearer ${auth.getToken()}`, ...extra };
}

const adminApi = {
  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  async getProducts(query = '?limit=200') {
    const res = await fetch(`${API_BASE_URL}/products${query}`);
    return res.json();
  },
  async getProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },
  async createProduct(data) {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async updateProduct(id, data) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE', headers: authHeaders() });
    return res.json();
  },
  async uploadImages(files) {
    const formData = new FormData();
    [...files].forEach((f) => formData.append('images', f));
    const res = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', headers: authHeaders(), body: formData });
    return res.json();
  },
  async uploadVideo(file) {
    const formData = new FormData();
    formData.append('video', file);
    const res = await fetch(`${API_BASE_URL}/upload/video`, { method: 'POST', headers: authHeaders(), body: formData });
    return res.json();
  },
  async getOrders(query = '') {
    const res = await fetch(`${API_BASE_URL}/orders${query}`, { headers: authHeaders() });
    return res.json();
  },
  async updateOrderStatus(id, orderStatus) {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ orderStatus }),
    });
    return res.json();
  },
  async getCustomers() {
    const res = await fetch(`${API_BASE_URL}/customers`, { headers: authHeaders() });
    return res.json();
  },
};

// On phones the menu is a swipeable strip: scroll so the current page's tab is visible
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.sidebar nav');
  const active = nav && nav.querySelector('a.active');
  if (nav && active) nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
});
