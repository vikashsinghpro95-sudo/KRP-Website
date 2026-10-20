/**
 * KOTA RANKERS POINT (KRP) · LIGHTWEIGHT CSS SCROLL-SNAP CAROUSEL
 */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
});

function initCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const itemWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 24 : 320;
        track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const itemWidth = track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 24 : 320;
        track.scrollBy({ left: itemWidth, behavior: 'smooth' });
      });
    }
  });
}
