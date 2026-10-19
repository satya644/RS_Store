const cart = {
  get() { return JSON.parse(localStorage.getItem('sj_cart') || '[]'); },
  save(items) { localStorage.setItem('sj_cart', JSON.stringify(items)); cart.updateBadge(); },
  add(product, quantity = 1) {
    const items = cart.get();
    const existing = items.find((i) => i.productId === product._id);
    if (existing) { existing.quantity += quantity; }
    else {
      items.push({
        productId: product._id, name: product.name,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        image: product.images[0]?.url || '', quantity,
      });
    }
    cart.save(items);
  },
  remove(productId) { cart.save(cart.get().filter((i) => i.productId !== productId)); },
  updateQuantity(productId, quantity) {
    const items = cart.get();
    const item = items.find((i) => i.productId === productId);
    if (item) { item.quantity = Math.max(1, quantity); cart.save(items); }
  },
  clear() { cart.save([]); },
  total() { return cart.get().reduce((sum, i) => sum + i.price * i.quantity, 0); },
  count() { return cart.get().reduce((sum, i) => sum + i.quantity, 0); },
  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = cart.count();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },
};

function toggleMobileNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', cart.updateBadge);
