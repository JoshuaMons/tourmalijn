/**
 * Coffeeshop Toermalijn – Tilburg
 * 18+ age gate, navbar, mobile menu, smooth scroll, footer year
 */

(function () {
  'use strict';

  const AGE_GATE_KEY = 'toermalijn-age-verified';

  // ---------- 18+ Age gate (on entry) ----------
  const ageGate = document.getElementById('ageGate');
  const ageGateYes = document.getElementById('ageGateYes');
  const ageGateNo = document.getElementById('ageGateNo');

  function hideAgeGate() {
    if (!ageGate) return;
    try {
      sessionStorage.setItem(AGE_GATE_KEY, '1');
    } catch (e) {}
    ageGate.classList.add('age-gate-hidden');
    document.body.classList.remove('age-gate-active');
  }

  function redirectToGoogle() {
    window.location.href = 'https://www.google.com';
  }

  if (ageGate) {
    if (sessionStorage.getItem(AGE_GATE_KEY) === '1') {
      hideAgeGate();
    } else {
      document.body.classList.add('age-gate-active');
    }

    if (ageGateYes) {
      ageGateYes.addEventListener('click', hideAgeGate);
    }
    if (ageGateNo) {
      ageGateNo.addEventListener('click', redirectToGoogle);
    }
  }

  // ---------- DOM elements ----------
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  // ---------- Sticky navbar background on scroll ----------
  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(13, 15, 12, 0.98)';
    } else {
      navbar.style.background = 'rgba(13, 15, 12, 0.92)';
    }
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // ---------- Mobile menu toggle ----------
  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking a nav link (smooth scroll will then happen)
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Reviews: dynamic load + horizontal scroll ----------
  const reviewsData = [
    { text: 'Vriendelijk personeel. Veel keuze, goede wietjes. Heerlijk met het vrouwtje in de tuin geblowd.', author: 'Kapitein Kaas', rating: 5 },
    { text: 'Very nice strains over here! Actual lab tested results on the Dutch grown Cali jars. Big menu and very friendly people.', author: 'unholyterpz', rating: 4 },
    { text: 'Beste shop van Tilburg, altijd goede kwaliteit van mochi tot gorilla glue.', author: 'Spookyblaz', rating: 5 },
    { text: 'Gummie bun voor €10 gehaald. Super wietje.. schoon en lekkere terpenen. Gassy earthy en zoet. En dat allemaal voor een tientje!', author: 'rapmexx', rating: 5 },
    { text: 'Top shelf 3.5gr Potjes zijn zeker een aanrader. Mijn favoriet is de sherblate... Maar de Gummie Bun zou er ook zo in kunnen zitten.', author: 'rapmexx', rating: 5 },
    { text: 'Beste shop van Tilburg.', author: 'monythejohl', rating: 5 },
    { text: '1 van de beste in tilburg', author: 'Confidential', rating: 4 },
    { text: 'Dure shop, wisselt vaak van mooie soorten en voor zowel de indica als de sativa stoners een plek waar je regelmatig ff binnen moet stappen! Deskundig personeel.', author: 'cannaseur', rating: 4 }
  ];

  function starString(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  const reviewsTrack = document.getElementById('reviewsTrack');
  if (reviewsTrack) {
    reviewsData.forEach(function (r) {
      const block = document.createElement('blockquote');
      block.className = 'review-card';
      block.innerHTML =
        '<div class="review-stars">' + starString(r.rating) + '</div>' +
        '<p>&ldquo;' + r.text + '&rdquo;</p>' +
        '<footer>— <cite>' + r.author + '</cite>, ' + r.rating + '/5</footer>';
      reviewsTrack.appendChild(block);
    });
  }

  // ---------- Footer year ----------
  const footerYearEl = document.getElementById('footerYear');
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }

})();
