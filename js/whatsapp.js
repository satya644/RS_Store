(function () {
  const WHATSAPP_NUMBER = '916386325046'; // with country code, no + or spaces
  const btn = document.createElement('a');
  btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I have a question about your jewellery.')}`;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.className = 'whatsapp-float';
  btn.title = 'Chat with us on WhatsApp';
  btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(btn));
})();
