// Mobile drawer menu
const toggle = document.querySelector('.menu-toggle');
const drawer = document.getElementById('drawer');
if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    const open = drawer.hasAttribute('hidden') ? false : true;
    if (open) {
      drawer.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      drawer.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
}

// Contact form basic handler (no backend): build a WhatsApp link and mailto fallback
const form = document.getElementById('contact-form');
const waBtn = document.getElementById('whatsapp-btn');
if (form && waBtn) {
  const buildMessage = (data) => (
    `Hola, soy ${data.name || '—'}%0A` +
    `Contacto: ${data.contact || '—'}%0A` +
    `Empresa: ${data.company || '—'}%0A` +
    `Necesito: ${data.message || '—'}%0A`
  );

  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const msg = buildMessage(data);
    const phone = '593987285191'; // principal
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent('Nuevo proyecto — Innovatech');
    const body = buildMessage(data);
    window.location.href = `mailto:garciajonathan268@gmail.com?subject=${subject}&body=${body}`;
  });
}
