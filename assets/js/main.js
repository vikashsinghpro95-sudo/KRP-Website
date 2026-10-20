/**
 * KOTA RANKERS POINT (KRP) · MAIN SCRIPT & GLOBAL CONFIG
 * Direction: "Prestige meets momentum. Kota discipline in Pune."
 */

// Global Configuration (Single Source of Truth for easy updates)
export const KRP_CONFIG = {
  INSTITUTE_NAME: "Kota Rankers Point",
  CITY: "Pune, Maharashtra",
  ADDRESS: "3rd Floor, Navya Business Park, Manaji Nagar, Narhe, Pune – 411041 (Behind Sinhgad/Navale Medical College)",
  PHONE_PRIMARY: "+91 86690 99430",
  PHONE_SECONDARY: "+91 90350 92974",
  PHONE_TEL: "+918669099430",
  WHATSAPP_NUMBER: "918669099430", // Country code + 10 digits
  EMAIL: "krppune.official@gmail.com",
  // Optional Formspree / Web3Forms endpoint. If empty, defaults to WhatsApp & Mailto flow.
  FORM_ENDPOINT: "", 
  ACADEMIC_SESSION: "2025-26"
};

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initScrollProgress();
  initAnnouncementBar();
  initScrollToTop();
  initPageTransitions();
});

/**
 * 1. Preloader (First visit only under 1.2s, stored in sessionStorage)
 */
function initPreloader() {
  const preloader = document.getElementById('site-preloader');
  if (!preloader) return;

  let hasVisited = false;
  try {
    hasVisited = sessionStorage.getItem('krp_preloader_seen') === 'true';
  } catch (e) {
    // Graceful fallback if storage disabled
    hasVisited = false;
  }

  if (hasVisited) {
    preloader.style.display = 'none';
    preloader.classList.add('is-loaded');
  } else {
    setTimeout(() => {
      preloader.classList.add('is-loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
      try {
        sessionStorage.setItem('krp_preloader_seen', 'true');
      } catch (e) {}
    }, 1100);
  }
}

/**
 * 2. 3px Gold Scroll Progress Bar under Header
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/**
 * 3. Dismissible Announcement Topbar
 */
function initAnnouncementBar() {
  const bar = document.getElementById('announcement-bar');
  const closeBtn = document.getElementById('announcement-close');
  if (!bar || !closeBtn) return;

  try {
    if (localStorage.getItem('krp_announcement_dismissed') === 'true') {
      bar.classList.add('is-dismissed');
    }
  } catch (e) {}

  closeBtn.addEventListener('click', () => {
    bar.classList.add('is-dismissed');
    try {
      localStorage.setItem('krp_announcement_dismissed', 'true');
    } catch (e) {}
  });
}

/**
 * 4. Scroll To Top Button with Progress Ring
 */
function initScrollToTop() {
  const btn = document.getElementById('btn-scroll-top');
  const mobileBar = document.getElementById('mobile-action-bar');
  if (!btn && !mobileBar) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (btn) {
      if (scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }
    if (mobileBar) {
      if (scrollY > 300) {
        mobileBar.classList.add('is-visible');
      } else {
        mobileBar.classList.remove('is-visible');
      }
    }
  }, { passive: true });

  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * 5. Toast Notification System
 */
export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#FFB800' : '#D92D20'}" stroke-width="2.5">
      ${type === 'success' ? '<path d="M20 6L9 17l-5-5"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'}
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

/**
 * 6. Subtle Page Transitions
 */
function initPageTransitions() {
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([href^="javascript:"])');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // If same page hash or external, ignore
      if (!href || href.startsWith('#') || href.includes('wa.me')) return;
      // Allow browser to naturally navigate while body has subtle fade out
      document.body.style.opacity = '0.9';
      document.body.style.transition = 'opacity 0.15s ease';
    });
  });
}
