/**
 * KIRPA CLEANERS - MAIN APPLICATION SCRIPT
 * Manages interactive components, dynamic estimation, navigation, FAQ filtering, & Schema injection
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicConfig();
  initNavigation();
  initBeforeAfterSlider();
  initEstimatorCalculator();
  initFaqAccordion();
  initFormValidation();
  initScrollEffects();
  injectSchemaOrg();
});

/* 1. Dynamic Config Population */
function initDynamicConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // Replace text for items marked with data-config attribute
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (SITE_CONFIG[key]) {
      el.textContent = SITE_CONFIG[key];
    }
  });

  // Replace href attributes for call / whatsapp / email links
  document.querySelectorAll('[data-config-href]').forEach(el => {
    const key = el.getAttribute('data-config-href');
    if (key === 'phone') {
      el.href = `tel:${SITE_CONFIG.phone}`;
    } else if (key === 'whatsapp') {
      el.href = `https://wa.me/${SITE_CONFIG.whatsappPhone}?text=Hi%20${encodeURIComponent(SITE_CONFIG.businessName)},%20I'd%20like%20to%20request%20a%20free%20cleaning%20quote!`;
    } else if (key === 'email') {
      el.href = `mailto:${SITE_CONFIG.email}`;
    }
  });
}

/* 2. Navigation & Mobile Drawer */
function initNavigation() {
  const header = document.querySelector('.header-main');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
}

/* 3. Interactive Before/After Image Slider */
function initBeforeAfterSlider() {
  const container = document.querySelector('.before-after-container');
  if (!container) return;

  const handle = container.querySelector('.slider-handle');
  const beforeImg = container.querySelector('.slider-img-before');

  let isDragging = false;

  function updateSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    if (beforeImg) beforeImg.style.width = `${percentage}%`;
    if (handle) handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (isDragging) updateSliderPosition(e.clientX);
  });

  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (isDragging) updateSliderPosition(e.touches[0].clientX);
  });
}

/* 4. Instant Booking Quote Estimator Calculator */
function initEstimatorCalculator() {
  const bedroomsInput = document.getElementById('calc-bedrooms');
  const bathroomsInput = document.getElementById('calc-bathrooms');
  const serviceTypeInput = document.getElementById('calc-service-type');
  const sqftInput = document.getElementById('calc-sqft');
  const displayPrice = document.getElementById('calc-display-price');

  if (!bedroomsInput || !displayPrice) return;

  function calculateEstimate() {
    const beds = parseInt(bedroomsInput.value || '1', 10);
    const baths = parseInt(bathroomsInput.value || '1', 10);
    const service = serviceTypeInput?.value || 'standard';
    const sqft = parseInt(sqftInput?.value || '1000', 10);

    let baseRate = 120;
    if (service === 'deep') baseRate = 180;
    if (service === 'moveout') baseRate = 240;
    if (service === 'airbnb') baseRate = 130;

    let extraBeds = (beds - 1) * 25;
    let extraBaths = (baths - 1) * 30;
    let sqftSurcharge = Math.max(0, Math.floor((sqft - 1000) / 500)) * 20;

    let total = baseRate + extraBeds + extraBaths + sqftSurcharge;
    displayPrice.textContent = `$${total}`;
  }

  bedroomsInput.addEventListener('change', calculateEstimate);
  bathroomsInput.addEventListener('change', calculateEstimate);
  serviceTypeInput?.addEventListener('change', calculateEstimate);
  sqftInput?.addEventListener('input', calculateEstimate);

  calculateEstimate();
}

/* 5. FAQ Accordion & Instant Search Filter */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faq-search-input');

  accordionItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    accordionItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* 6. Form Client-Side Validation & Confirmation Toast */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const requiredInputs = form.querySelectorAll('[required]');
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        showToast('Thank you! Your cleaning request has been submitted. We will contact you within 15 minutes.');
        form.reset();
      } else {
        showToast('Please fill out all required fields marked with *', true);
      }
    });
  });
}

function showToast(message, isError = false) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) toast.style.borderLeftColor = '#EF4444';

  toast.innerHTML = `
    <i class="ri-${isError ? 'error-warning-line' : 'checkbox-circle-line'}" style="color:${isError ? '#EF4444' : '#10B981'}; font-size:1.4rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4500);
}

/* 7. Scroll Effects & Progress Bar */
function initScrollEffects() {
  const progressBar = document.querySelector('.scroll-progress');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Scroll progress line
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    // Back to top button visibility
    if (winScroll > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 8. Inject Schema.org LocalBusiness JSON-LD dynamically for Canadian Local SEO */
function injectSchemaOrg() {
  if (typeof SITE_CONFIG === 'undefined') return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": SITE_CONFIG.businessName,
    "legalName": SITE_CONFIG.legalName,
    "description": SITE_CONFIG.tagline,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": SITE_CONFIG.city,
      "addressRegion": SITE_CONFIG.province,
      "postalCode": SITE_CONFIG.postalCode,
      "addressCountry": SITE_CONFIG.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.7586151",
      "longitude": "-79.7836161"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": SITE_CONFIG.rating,
      "reviewCount": SITE_CONFIG.reviewsCount
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "$$"
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
