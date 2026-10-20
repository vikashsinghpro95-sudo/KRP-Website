/**
 * KOTA RANKERS POINT (KRP) · NAVIGATION & HEADER LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  highlightActiveLink();
});

/**
 * 1. Header scroll changes (Transparent -> Solid with shadow & shrink)
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * 2. Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close when clicking a link inside mobile drawer
  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * 3. Highlight Current Active Navigation Link
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/index\.html$/, '').replace(/\/$/, '').replace(/^\.\.\//, '').replace(/^\.\//, '');
    
    if (cleanHref && (currentPath.endsWith(cleanHref) || (cleanHref === '' && (currentPath === '' || currentPath === '/')))) {
      link.classList.add('is-active');
    }
  });
}
