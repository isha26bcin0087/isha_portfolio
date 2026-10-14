/**
 * ==============================================================================
 * ISHA SHARMA - LIVE PORTFOLIO CUSTOMIZER
 * ==============================================================================
 * This interactive tool allows Isha to edit her details directly inside the browser.
 * She can update:
 * - Name & Intro Lines
 * - Phone Number & Dial Link
 * - LinkedIn Profile URL & Text
 * - Email Address
 * - Education Details
 * 
 * Features:
 * - Instant live preview on click
 * - Saves updates to browser localStorage
 * - One-click "Download Updated config.js" button to permanently save to disk!
 * ==============================================================================
 */

(function () {
  'use strict';

  function createCustomizerUI() {
    // 1. Floating trigger button
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'portfolio-customizer-trigger';
    triggerBtn.className = 'customizer-trigger';
    triggerBtn.setAttribute('title', 'Customize details on this website');
    triggerBtn.innerHTML = `
      <span class="customizer-icon">⚙️</span>
      <span class="customizer-label">Edit Details</span>
    `;

    // 2. Customizer Drawer overlay & modal
    const drawerOverlay = document.createElement('div');
    drawerOverlay.id = 'portfolio-customizer-overlay';
    drawerOverlay.className = 'customizer-overlay';

    drawerOverlay.innerHTML = `
      <div class="customizer-drawer" role="dialog" aria-modal="true" aria-labelledby="customizer-title">
        <div class="customizer-header">
          <div class="customizer-title-wrap">
            <span class="badge-mini">Live Editor</span>
            <h3 id="customizer-title">Customize Your Details</h3>
            <p class="customizer-desc">Edit your contact info, intro, and links here. See changes live instantly!</p>
          </div>
          <button id="customizer-close-btn" class="customizer-close" aria-label="Close customizer">&times;</button>
        </div>

        <div class="customizer-body">
          <form id="customizer-form">
            <!-- Basic Information -->
            <div class="customizer-section-title">👤 Basic Information</div>
            
            <div class="form-group">
              <label for="cust-name">Full Name</label>
              <input type="text" id="cust-name" placeholder="Isha Sharma" />
            </div>

            <div class="form-group">
              <label for="cust-city">City / Location</label>
              <input type="text" id="cust-city" placeholder="Jaipur, Rajasthan, India" />
            </div>

            <div class="form-group">
              <label for="cust-intro1">Home Intro Line 1</label>
              <textarea id="cust-intro1" rows="2" placeholder="First-year Civil Engineering student at JECRC University, Jaipur."></textarea>
            </div>

            <div class="form-group">
              <label for="cust-intro2">Home Intro Line 2</label>
              <textarea id="cust-intro2" rows="2" placeholder="Passionate Prompt Engineer & AI Generalist bridging engineering with intelligent technology."></textarea>
            </div>

            <!-- Contact & Social Links -->
            <div class="customizer-section-title">📞 Contact & Clickable Links</div>
            
            <div class="form-group">
              <label for="cust-phone">Phone Number (Display Text)</label>
              <input type="text" id="cust-phone" placeholder="e.g. +91 98765 43210" />
              <small class="helper-text">Replace "........." with your contact number.</small>
            </div>

            <div class="form-group">
              <label for="cust-linkedin">LinkedIn Profile URL or Handle</label>
              <input type="text" id="cust-linkedin" placeholder="e.g. https://www.linkedin.com/in/isha-sharma" />
              <small class="helper-text">Replace "........" with your real LinkedIn profile link.</small>
            </div>

            <div class="form-group">
              <label for="cust-email">Email Address</label>
              <input type="email" id="cust-email" placeholder="e.g. isha.sharma@example.com" />
            </div>

            <!-- Education -->
            <div class="customizer-section-title">🎓 Education Details</div>

            <div class="form-group">
              <label for="cust-university">University</label>
              <input type="text" id="cust-university" placeholder="JECRC University, Jaipur" />
            </div>

            <div class="form-group">
              <label for="cust-school">School</label>
              <input type="text" id="cust-school" placeholder="Rukmani Birla Modern High School, Jaipur" />
            </div>

            <!-- Action Buttons -->
            <div class="customizer-actions">
              <button type="submit" class="btn btn-primary btn-block">
                <span>💾 Apply & Save Changes</span>
              </button>
              
              <button type="button" id="cust-download-config-btn" class="btn btn-secondary btn-block">
                <span>📥 Download Updated config.js</span>
              </button>

              <button type="button" id="cust-reset-btn" class="btn btn-outline btn-block">
                <span>🔄 Reset to Original</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(triggerBtn);
    document.body.appendChild(drawerOverlay);

    setupCustomizerEvents(triggerBtn, drawerOverlay);
  }

  function setupCustomizerEvents(triggerBtn, drawerOverlay) {
    const closeBtn = document.getElementById('customizer-close-btn');
    const form = document.getElementById('customizer-form');
    const resetBtn = document.getElementById('cust-reset-btn');
    const downloadBtn = document.getElementById('cust-download-config-btn');

    function openDrawer() {
      populateFormInputs();
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    triggerBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);

    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOverlay.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveFormInputs();
      closeDrawer();
      if (window.showPortfolioToast) {
        window.showPortfolioToast('✨ Portfolio details updated successfully!');
      }
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all details back to default values?')) {
        localStorage.removeItem('isha_portfolio_custom_data');
        if (window.refreshPortfolioData) {
          window.refreshPortfolioData();
        }
        populateFormInputs();
        if (window.showPortfolioToast) {
          window.showPortfolioToast('↺ Reset to defaults.');
        }
      }
    });

    // Download updated config.js file button
    downloadBtn.addEventListener('click', () => {
      saveFormInputs();
      downloadUpdatedConfigFile();
    });
  }

  function populateFormInputs() {
    const config = window.ACTIVE_CONFIG || window.PORTFOLIO_CONFIG || {};
    
    setVal('cust-name', config.personal?.fullName);
    setVal('cust-city', config.personal?.location);
    setVal('cust-intro1', config.home?.introLine1);
    setVal('cust-intro2', config.home?.introLine2);
    setVal('cust-phone', config.personal?.phone);
    setVal('cust-linkedin', config.personal?.linkedin);
    setVal('cust-email', config.personal?.email);
    setVal('cust-university', config.personal?.university);
    setVal('cust-school', config.personal?.school);
  }

  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
  }

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function saveFormInputs() {
    const current = window.ACTIVE_CONFIG || window.PORTFOLIO_CONFIG;
    const phoneVal = getVal('cust-phone') || current.personal.phone;
    const linkedinVal = getVal('cust-linkedin') || current.personal.linkedin;
    const emailVal = getVal('cust-email') || current.personal.email;

    let cleanPhone = phoneVal.replace(/[^0-9+]/g, '');
    let phoneHref = cleanPhone ? `tel:${cleanPhone}` : phoneVal;

    let linkedinHref = linkedinVal;
    if (linkedinHref && !linkedinHref.startsWith('http://') && !linkedinHref.startsWith('https://')) {
      linkedinHref = 'https://' + linkedinHref;
    }

    const updated = {
      personal: {
        fullName: getVal('cust-name') || current.personal.fullName,
        location: getVal('cust-city') || current.personal.location,
        phone: phoneVal,
        phoneHref: phoneHref,
        linkedin: linkedinVal,
        linkedinHref: linkedinHref,
        email: emailVal,
        emailHref: `mailto:${emailVal}`,
        university: getVal('cust-university') || current.personal.university,
        school: getVal('cust-school') || current.personal.school
      },
      home: {
        introLine1: getVal('cust-intro1') || current.home.introLine1,
        introLine2: getVal('cust-intro2') || current.home.introLine2
      }
    };

    localStorage.setItem('isha_portfolio_custom_data', JSON.stringify(updated));

    if (window.refreshPortfolioData) {
      window.refreshPortfolioData();
    }
  }

  function downloadUpdatedConfigFile() {
    const config = window.ACTIVE_CONFIG || window.PORTFOLIO_CONFIG;
    const fileContent = `/**
 * ==============================================================================
 * ISHA SHARMA - PORTFOLIO CONFIGURATION (CUSTOMIZED)
 * ==============================================================================
 * Automatically generated by your in-browser Portfolio Customizer.
 * Save this file to assets/js/config.js to keep your changes permanently.
 * ==============================================================================
 */

const PORTFOLIO_CONFIG = ${JSON.stringify(config, null, 2)};

if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
`;

    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window.showPortfolioToast) {
      window.showPortfolioToast('📥 config.js downloaded! Replace assets/js/config.js to make it permanent.');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    createCustomizerUI();
  });
})();
