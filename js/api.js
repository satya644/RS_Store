const api = {
  async getProducts(query = '') {
    const res = await fetch(`${API_BASE_URL}/products${query}`);
    return res.json();
  },
  async getProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },
  async getReviews(productId) {
    const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
    return res.json();
  },
  async addReview(productId, data) {
    const headers = { 'Content-Type': 'application/json' };
    if (typeof customerAuth !== 'undefined' && customerAuth.getToken()) {
      headers['Authorization'] = `Bearer ${customerAuth.getToken()}`;
    }
    const res = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async placeOrder(orderData) {
    const headers = { 'Content-Type': 'application/json' };
    if (typeof customerAuth !== 'undefined' && customerAuth.getToken()) {
      headers['Authorization'] = `Bearer ${customerAuth.getToken()}`;
    }
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });
    return res.json();
  },
};