/**
 * Coffeeshop Toermalijn – Tilburg
 * Navbar, mobile menu, smooth scroll, footer year
 */

(function () {
  'use strict';

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

})();
