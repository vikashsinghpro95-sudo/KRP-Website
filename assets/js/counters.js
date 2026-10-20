/**
 * KOTA RANKERS POINT (KRP) · STATS COUNT-UP ANIMATION
 */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counterElements.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-counter'), 10);
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = parseInt(element.getAttribute('data-duration'), 10) || 1800; // ms
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out cubic formula
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeOut * target);

    element.innerHTML = `${currentVal.toLocaleString('en-IN')}<span class="stat-plus">${suffix}</span>`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.innerHTML = `${target.toLocaleString('en-IN')}<span class="stat-plus">${suffix}</span>`;
    }
  };

  requestAnimationFrame(update);
}
