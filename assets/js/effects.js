/**
 * KOTA RANKERS POINT (KRP) · WOW EFFECTS & MICRO-INTERACTIONS
 * Includes: Cursor Glow over Navy sections, 3D card tilt, magnetic buttons, and button ripples.
 */

document.addEventListener('DOMContentLoaded', () => {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initButtonRipple();

  if (!isTouch && !prefersReducedMotion) {
    initCursorGlow();
    initCardTilt();
    initMagneticButtons();
  }
});

/**
 * 1. Button Ripple Effect
 */
function initButtonRipple() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * 2. Soft Gold Radial Cursor Glow on Navy Sections
 */
function initCursorGlow() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const navySections = document.querySelectorAll('.hero-section, .flagship-band, .inner-hero, .footer-cta-band, .site-footer');
  if (!navySections.length) return;

  const glowEl = document.createElement('div');
  glowEl.style.cssText = `
    position: fixed;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 184, 0, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 99;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glowEl);

  let isOverNavy = false;

  window.addEventListener('mousemove', (e) => {
    glowEl.style.left = `${e.clientX}px`;
    glowEl.style.top = `${e.clientY}px`;

    // Check if pointer is over any navy element
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const inNavy = target && target.closest('.hero-section, .flagship-band, .inner-hero, .footer-cta-band, .site-footer, .card-dark');

    if (inNavy && !isOverNavy) {
      isOverNavy = true;
      glowEl.style.opacity = '1';
    } else if (!inNavy && isOverNavy) {
      isOverNavy = false;
      glowEl.style.opacity = '0';
    }
  }, { passive: true });
}

/**
 * 3. Subtle 3D Card Tilt (Max 6 degrees)
 */
function initCardTilt() {
  const tiltCards = document.querySelectorAll('.course-card, .bento-tile, .residence-wing-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/**
 * 4. Magnetic CTA Buttons
 */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-primary');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
