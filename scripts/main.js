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

// Theme toggle with persistence
(function(){
  const KEY = 'theme';
  const btn = document.getElementById('theme-toggle');
  const btnDrawer = document.getElementById('theme-toggle-drawer');
  const root = document.documentElement;

  const apply = (mode) => {
    if (mode === 'light') root.classList.add('theme-light');
    else root.classList.remove('theme-light');
    const isLight = root.classList.contains('theme-light');
    btn && btn.setAttribute('aria-pressed', String(isLight));
    btn && (btn.textContent = isLight ? '☀' : '☾');
    btnDrawer && btnDrawer.setAttribute('aria-pressed', String(isLight));
    btnDrawer && (btnDrawer.textContent = isLight ? '☀' : '☾');
  };

  const stored = localStorage.getItem(KEY);
  // Por defecto 'dark' si el usuario no ha elegido uno manualmente
  const initial = stored || 'dark';
  apply(initial);

  const toggleTheme = () => {
    const next = root.classList.contains('theme-light') ? 'dark' : 'light';
    localStorage.setItem(KEY, next);
    apply(next);
  };
  btn && btn.addEventListener('click', toggleTheme);
  btnDrawer && btnDrawer.addEventListener('click', toggleTheme);
})();

// Contact form basic handler (no backend): build a WhatsApp link and mailto fallback
const form = document.getElementById('contact-form');
const waBtn = document.getElementById('whatsapp-btn');
const floatWA = document.getElementById('float-wa');
if (form && waBtn) {
  const buildMessage = (data) => (
    `Hola, soy ${data.name || '—'}%0A` +
    `Contacto: ${data.contact || '—'}%0A` +
    `Empresa: ${data.company || '—'}%0A` +
    `Necesito: ${data.message || '—'}%0A`
  );

  const openWA = (data) => {
    const msg = buildMessage(data || {});
    const phone = '593987285191'; // principal
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    openWA(data);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent('Nuevo proyecto — Innovatech');
    const body = buildMessage(data);
    window.location.href = `mailto:garciajonathan268@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Botón flotante WhatsApp (funciona aunque no se haya llenado el formulario)
if (floatWA) {
  floatWA.addEventListener('click', (e) => {
    e.preventDefault();
    const data = form ? Object.fromEntries(new FormData(form).entries()) : {};
    const msg = buildMessage(data);
    const phone = '593987285191';
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  });
}

// API Details Toggle
const apiCard = document.getElementById('card-api');
const apiSection = document.getElementById('api-details');

if (apiCard && apiSection) {
  apiCard.style.cursor = 'pointer';
  apiCard.addEventListener('click', (e) => {
    // Si el clic fue en el botón del manual, no hacer toggle de la sección
    if (e.target.closest('.manual-btn')) return;
    
    apiSection.classList.toggle('active');
    if (apiSection.classList.contains('active')) {
      apiSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
