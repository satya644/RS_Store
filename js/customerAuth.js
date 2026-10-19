// Uses API_BASE_URL from config.js

const customerAuth = {
  getToken() { return localStorage.getItem('sj_customer_token'); },
  setToken(token) { localStorage.setItem('sj_customer_token', token); },
  getCustomer() { return JSON.parse(localStorage.getItem('sj_customer') || 'null'); },
  setCustomer(c) { localStorage.setItem('sj_customer', JSON.stringify(c)); },
  isLoggedIn() { return !!customerAuth.getToken(); },
  logout() {
    localStorage.removeItem('sj_customer_token');
    localStorage.removeItem('sj_customer');
    window.location.reload();
  },
};

function customerAuthHeaders(extra = {}) {
  return { Authorization: `Bearer ${customerAuth.getToken()}`, ...extra };
}

const customerApi = {
  async register(data) {
    const res = await fetch(`${API_BASE_URL}/customers/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    return res.json();
  },
  async login(phone, password) {
    const res = await fetch(`${API_BASE_URL}/customers/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, password }),
    });
    return res.json();
  },
  async getProfile() {
    const res = await fetch(`${API_BASE_URL}/customers/profile`, { headers: customerAuthHeaders() });
    return res.json();
  },
  async updateProfile(data) {
    const res = await fetch(`${API_BASE_URL}/customers/profile`, {
      method: 'PUT', headers: customerAuthHeaders({ 'Content-Type': 'application/json' }), body: JSON.stringify(data),
    });
    return res.json();
  },
};

function renderProfileIcon() {
  const el = document.getElementById('profile-icon-slot');
  if (!el) return;
  const prefix = el.dataset.prefix || '';
  if (customerAuth.isLoggedIn()) {
    const c = customerAuth.getCustomer();
    el.innerHTML = `<a href="${prefix}profile.html" title="${c?.name || 'My account'}"><i class="fa-solid fa-circle-user"></i></a>`;
  } else {
    el.innerHTML = `<a href="${prefix}login.html" title="Sign in"><i class="fa-regular fa-circle-user"></i></a>`;
  }
}

document.addEventListener('DOMContentLoaded', renderProfileIcon);
