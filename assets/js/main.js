/**
 * ==============================================================================
 * ISHA SHARMA - MAIN JAVASCRIPT CONTROLLER
 * ==============================================================================
 * Handles:
 * 1. Merging Central Config & Local Storage edits
 * 2. Theme Toggle (Light / Dark Mode with persistent memory)
 * 3. Mobile Navigation Menu Toggle
 * 4. Active Page Link detection
 * 5. One-Click Copy utility with Toast feedback
 * 6. Contact form validation and interactive response
 * ==============================================================================
 */

(function () {
  'use strict';

  // --- 1. Load Data & Override from LocalStorage if user customized in browser ---
  function getActiveConfig() {
    let config = window.PORTFOLIO_CONFIG || {};
    try {
      const saved = localStorage.getItem('isha_portfolio_custom_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        config = deepMerge(config, parsed);
      }
    } catch (e) {
      console.warn("Could not read local storage customization", e);
    }
    return config;
  }

  function deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  // --- 2. Populate Dynamic Elements Marked with data-bind ---
  function renderConfigData() {
    const config = getActiveConfig();
    window.ACTIVE_CONFIG = config;

    // Elements bound with [data-bind="object.key"]
    document.querySelectorAll('[data-bind]').forEach(el => {
      const path = el.getAttribute('data-bind');
      const val = resolvePath(config, path);
      if (val !== undefined && val !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Elements bound with [data-bind-href="object.key"]
    document.querySelectorAll('[data-bind-href]').forEach(el => {
      const path = el.getAttribute('data-bind-href');
      const val = resolvePath(config, path);
      if (val) {
        el.setAttribute('href', val);
      }
    });

    // Custom updates for specific IDs if present
    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneLink && config.personal?.phone) {
      phoneLink.textContent = config.personal.phone;
      const cleanPhone = config.personal.phone.replace(/[^0-9+]/g, '');
      phoneLink.href = cleanPhone ? `tel:${cleanPhone}` : (config.personal.phoneHref || '#');
    }

    const linkedinLink = document.getElementById('contact-linkedin-link');
    if (linkedinLink && config.personal?.linkedin) {
      linkedinLink.textContent = config.personal.linkedin;
      let url = config.personal.linkedin;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      linkedinLink.href = url;
    }

    const emailLink = document.getElementById('contact-email-link');
    if (emailLink && config.personal?.email) {
      emailLink.textContent = config.personal.email;
      emailLink.href = `mailto:${config.personal.email}`;
    }
  }

  function resolvePath(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
  }

  // --- 3. Theme Toggle (Dark / Light Mode) ---
  function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('isha_portfolio_theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('isha_portfolio_theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  function updateThemeIcon(theme) {
    const iconSpan = document.getElementById('theme-icon');
    if (iconSpan) {
      iconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // --- 4. Mobile Menu Navigation ---
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
      });

      // Close menu on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
        });
      });
    }
  }

  // --- 5. Highlight Current Active Nav Link ---
  function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --- 6. Toast Notification & Copy to Clipboard ---
  function showToast(message, duration = 3000) {
    let toast = document.getElementById('portfolio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolio-toast';
      toast.className = 'portfolio-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  function initCopyButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-copy-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const textToCopy = targetEl.textContent.trim();
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied to clipboard: "${textToCopy}"`);
          }).catch(() => {
            // Fallback for older browsers
            const input = document.createElement('input');
            input.value = textToCopy;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            showToast(`Copied: "${textToCopy}"`);
          });
        }
      });
    });
  }

  // --- 7. Interactive Contact Form (Client Side) ---
  function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sender-name')?.value || 'Guest';
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `<span>Sending...</span>`;
        submitBtn.disabled = true;

        setTimeout(() => {
          showToast(`Thank you, ${name}! Your message was simulated successfully.`);
          form.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 800);
      });
    }
  }

  // Expose re-render method globally for the customizer drawer
  window.refreshPortfolioData = renderConfigData;
  window.showPortfolioToast = showToast;

  // --- Initialize on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderConfigData();
    initMobileMenu();
    highlightActiveNav();
    initCopyButtons();
    initContactForm();
  });
})();
