/**
 * KOTA RANKERS POINT (KRP) · ACCORDION SYSTEM
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
});

function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    // Check if open by default
    if (item.classList.contains('is-open')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      header.setAttribute('aria-expanded', 'true');
    } else {
      header.setAttribute('aria-expanded', 'false');
    }

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close siblings if in single-expand mode
      const parent = item.closest('.accordion');
      if (parent && parent.hasAttribute('data-single-open')) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('is-open');
            const sibContent = sibling.querySelector('.accordion-content');
            const sibHeader = sibling.querySelector('.accordion-header');
            if (sibContent) sibContent.style.maxHeight = null;
            if (sibHeader) sibHeader.setAttribute('aria-expanded', 'false');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-open');
        content.style.maxHeight = null;
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
