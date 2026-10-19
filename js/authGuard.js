(function () {
  const path = window.location.pathname;

  // Login is strictly required only on checkout and profile pages
  const protectedPages = ['checkout.html', 'profile.html'];
  const requiresAuth = protectedPages.some(page => path.endsWith(page));

  if (!requiresAuth) return;

  if (typeof customerAuth === 'undefined' || !customerAuth.isLoggedIn()) {
    sessionStorage.setItem('sj_redirect_after_login', window.location.href);
    const inPagesFolder = path.includes('/pages/');
    window.location.href = inPagesFolder ? 'login.html' : 'pages/login.html';
  }
})();