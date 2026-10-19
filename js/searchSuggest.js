function initSearchSuggestions() {
  const input = document.getElementById('header-search-input');
  if (!input) return;
  const wrapper = input.closest('.header-search');
  if (!wrapper) return;

  // Agar purana dropdown exist kare to remove karein
  const oldDropdown = wrapper.querySelector('.search-suggestions');
  if (oldDropdown) oldDropdown.remove();

  const dropdown = document.createElement('div');
  dropdown.className = 'search-suggestions';
  wrapper.appendChild(dropdown);

  const inPagesFolder = window.location.pathname.includes('/pages/');
  const productLink = (id) => (inPagesFolder ? 'product.html' : 'pages/product.html') + '?id=' + id;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    if (q.length < 2) { 
      dropdown.style.display = 'none'; 
      dropdown.innerHTML = '';
      return; 
    }
    
    debounceTimer = setTimeout(async () => {
      try {
        const res = await api.getProducts(`?search=${encodeURIComponent(q)}&limit=5`);
        const items = res.data || [];
        if (!items.length) {
          dropdown.innerHTML = '<div class="suggestion-empty">No matching jewellery found</div>';
        } else {
          dropdown.innerHTML = items.map((p) => {
            const img = p.images?.[0]?.url || 'https://via.placeholder.com/60x60/f5ead9/6b1233?text=RS';
            const price = Number(p.discountPrice) > 0 ? p.discountPrice : p.price;
            return `
              <a class="suggestion-item" href="${productLink(p._id)}">
                <img src="${img}" alt="${p.name}">
                <div class="suggestion-text">
                  <p class="suggestion-name">${p.name}</p>
                  <span class="suggestion-price">₹${price}</span>
                </div>
              </a>`;
          }).join('');
        }
        dropdown.style.display = 'block';
      } catch (e) { 
        dropdown.style.display = 'none'; 
      }
    }, 250);
  });

  document.addEventListener('click', (e) => { 
    if (!wrapper.contains(e.target)) {
      dropdown.style.display = 'none'; 
    }
  });
}

document.addEventListener('DOMContentLoaded', initSearchSuggestions);