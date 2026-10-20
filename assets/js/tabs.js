/**
 * KOTA RANKERS POINT (KRP) · TABS & SEGMENTED CONTROLS
 */

document.addEventListener('DOMContentLoaded', () => {
  initStandardTabs();
  initResidenceSwitch();
});

/**
 * 1. Standard Tabs System
 */
function initStandardTabs() {
  const tabGroups = document.querySelectorAll('[data-tabs-group]');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const groupName = group.getAttribute('data-tabs-group');
    const panels = document.querySelectorAll(`[data-tab-panel="${groupName}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');

        buttons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        panels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add('is-active');
          } else {
            panel.classList.remove('is-active');
          }
        });
      });
    });
  });
}

/**
 * 2. Boys vs Girls Residence Toggle Switch
 */
function initResidenceSwitch() {
  const switchContainer = document.querySelector('.residence-switch');
  if (!switchContainer) return;

  const buttons = switchContainer.querySelectorAll('.residence-btn');
  const boysBlock = document.getElementById('residence-boys-block');
  const girlsBlock = document.getElementById('residence-girls-block');

  if (!boysBlock || !girlsBlock) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-residence');
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      if (target === 'boys') {
        boysBlock.style.display = 'block';
        girlsBlock.style.display = 'none';
      } else {
        boysBlock.style.display = 'none';
        girlsBlock.style.display = 'block';
      }
    });
  });
}
