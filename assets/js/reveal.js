/**
 * KOTA RANKERS POINT (KRP) · SCROLL REVEALS & TIMELINE ANIMATION
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  initScrollReveals();
  initTimelineScrollDraw();
});

/**
 * 1. IntersectionObserver Reveal Elements
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  // Set initial styles via JS so CSS-disabled / no-JS environments stay visible
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-reveal-delay') || '0';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, parseInt(delay, 10));

        observer.unobserve(el);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.15
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 2. Admissions Timeline Draw on Scroll
 */
function initTimelineScrollDraw() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const steps = timeline.querySelectorAll('.timeline-step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        const marker = entry.target.querySelector('.timeline-marker');
        if (marker) {
          marker.style.transform = 'scale(1.15)';
          setTimeout(() => marker.style.transform = 'scale(1)', 250);
        }
      }
    });
  }, { threshold: 0.35 });

  steps.forEach(step => observer.observe(step));
}
