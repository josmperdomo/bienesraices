/**
 * BIENES RAÍCES - LUXURY REAL ESTATE (2026 Warm Luxury Edition)
 * Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPropertyFilters();
  initHeroSearchFilter();
  initContactForm();
  updateFooterYear();
});

/**
 * 1. Mobile Menu
 */
function initMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu');
  const nav = document.querySelector('.navegacion');

  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-nav-active');
    });
  }
}

/**
 * 2. Category Property Filter Tabs
 */
function initPropertyFilters() {
  const tabs = document.querySelectorAll('.cat-tab-btn');
  const properties = document.querySelectorAll('.anuncio');

  if (!tabs.length || !properties.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter') || 'all';

      properties.forEach(card => {
        const type = card.getAttribute('data-type') || 'casa';
        if (filter === 'all' || type === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 3. Hero Quick Filter Search
 */
function initHeroSearchFilter() {
  const searchBtn = document.getElementById('btn-hero-search');
  const typeSelect = document.getElementById('hero-property-type');
  const properties = document.querySelectorAll('.anuncio');

  if (!searchBtn || !typeSelect || !properties.length) return;

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedType = typeSelect.value;

    properties.forEach(card => {
      const type = card.getAttribute('data-type') || 'casa';
      if (selectedType === 'all' || type === selectedType) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Smooth scroll down to properties
    const targetSection = document.getElementById('anuncios-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/**
 * 4. Contact Form Validation and Toast
 */
function initContactForm() {
  const form = document.querySelector('.formulario-luxury') || document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('input[type="submit"]') || form.querySelector('button[type="submit"]');

    if (!nameInput || !nameInput.value.trim()) {
      showLuxuryToast('Por favor, ingresa tu nombre completo.');
      nameInput && nameInput.focus();
      return;
    }

    if (!emailInput || !emailInput.value.trim()) {
      showLuxuryToast('Por favor, ingresa un correo electrónico de contacto.');
      emailInput && emailInput.focus();
      return;
    }

    const originalVal = submitBtn ? (submitBtn.value || submitBtn.textContent) : 'Enviar';
    if (submitBtn) {
      if (submitBtn.tagName === 'INPUT') submitBtn.value = 'Procesando...';
      else submitBtn.textContent = 'Procesando...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      showLuxuryToast(`¡Gracias ${nameInput.value}! Hemos recibido tu consulta. Un asesor inmobiliario exclusivo te contactará hoy.`);
      form.reset();
      if (submitBtn) {
        if (submitBtn.tagName === 'INPUT') submitBtn.value = originalVal;
        else submitBtn.textContent = originalVal;
        submitBtn.disabled = false;
      }
    }, 1200);
  });
}

function showLuxuryToast(message) {
  let toast = document.getElementById('luxury-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'luxury-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #162f27;
      color: #fcfbf9;
      border: 1px solid #c5a880;
      padding: 1.25rem 1.75rem;
      border-radius: 8px;
      box-shadow: 0 15px 35px rgba(22, 47, 39, 0.35);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 500;
      font-size: 0.95rem;
      z-index: 9999;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(100px);
      opacity: 0;
      max-width: 420px;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 4500);
}

/**
 * 5. Update Footer Year
 */
function updateFooterYear() {
  const yearEls = document.querySelectorAll('#current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = year);
}
