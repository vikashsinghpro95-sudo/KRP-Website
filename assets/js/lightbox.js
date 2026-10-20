/**
 * KOTA RANKERS POINT (KRP) · MEDIA LIGHTBOX & VIDEO FACADES
 */

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initVideoFacades();
});

function initLightbox() {
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.getElementById('media-lightbox');
  if (!galleryItems.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentVisibleItems = [];
  let currentIndex = 0;

  const getVisibleItems = () => {
    return Array.from(galleryItems).filter(item => {
      return item.style.display !== 'none' && !item.classList.contains('is-hidden');
    });
  };

  const openLightbox = (item) => {
    currentVisibleItems = getVisibleItems();
    if (!currentVisibleItems.length) currentVisibleItems = Array.from(galleryItems);
    currentIndex = currentVisibleItems.indexOf(item);
    if (currentIndex === -1) currentIndex = 0;

    const targetItem = currentVisibleItems[currentIndex];
    const src = targetItem.getAttribute('data-src') || targetItem.querySelector('img')?.src;
    const caption = targetItem.getAttribute('data-caption') || targetItem.querySelector('h5')?.textContent || '';

    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    if (!currentVisibleItems.length) currentVisibleItems = getVisibleItems();
    if (!currentVisibleItems.length) return;
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    const targetItem = currentVisibleItems[currentIndex];
    const src = targetItem.getAttribute('data-src') || targetItem.querySelector('img')?.src;
    const caption = targetItem.getAttribute('data-caption') || targetItem.querySelector('h5')?.textContent || '';
    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
  };

  const showPrev = () => {
    if (!currentVisibleItems.length) currentVisibleItems = getVisibleItems();
    if (!currentVisibleItems.length) return;
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    const targetItem = currentVisibleItems[currentIndex];
    const src = targetItem.getAttribute('data-src') || targetItem.querySelector('img')?.src;
    const caption = targetItem.getAttribute('data-caption') || targetItem.querySelector('h5')?.textContent || '';
    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption;
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

function initVideoFacades() {
  const facades = document.querySelectorAll('.video-facade');
  facades.forEach(facade => {
    facade.addEventListener('click', () => {
      const videoId = facade.getAttribute('data-youtube-id');
      if (!videoId) return;

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';

      facade.innerHTML = '';
      facade.appendChild(iframe);
    });
  });
}
