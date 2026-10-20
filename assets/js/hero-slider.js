/**
 * KOTA RANKERS POINT (KRP) · HERO COURSE SLIDER
 * High-performance, smooth vanilla ES6+ slider for flagship academy courses:
 * 1. NDA / SSB / Armed Forces & Residential Wing
 * 2. IIT-JEE (Main & Advanced)
 * 3. NEET UG (Medical Entrance)
 * 4. IMUCET & Merchant Navy
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});

export function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const pills = slider.querySelectorAll('.hero-course-pill');
  const dots = slider.querySelectorAll('.hero-slider-dot');
  const prevBtn = slider.querySelector('.hero-slider-prev');
  const nextBtn = slider.querySelector('.hero-slider-next');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 6000; // 6 seconds per slide

  function showSlide(index, announce = true) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide, i) => {
      const isActive = i === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', !isActive);

      // Trigger reveal animations on active slide elements
      if (isActive) {
        const reveals = slide.querySelectorAll('[data-reveal]');
        reveals.forEach(el => el.classList.add('is-revealed'));
      }
    });

    // Update Course Pills
    pills.forEach((pill, i) => {
      const isActive = i === currentIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-selected', isActive);
    });

    // Update Dots
    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Prev / Next button clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay(); // Reset autoplay timer
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay(); // Reset autoplay timer
    });
  }

  // Course Pills click
  pills.forEach((pill, index) => {
    pill.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  // Dots click
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Touch Swipe Support for Mobile & Tablets
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Initialize first slide and start autoplay
  showSlide(0, false);
  startAutoplay();
}
