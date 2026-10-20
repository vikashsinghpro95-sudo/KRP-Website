/**
 * KOTA RANKERS POINT (KRP) · ADMISSION ENQUIRY FORM (PURE CLIENT-SIDE)
 * Hard constraint: NO PHP. NO backend. Pure client-side validation + WhatsApp click-to-chat + Mailto fallback.
 */

import { KRP_CONFIG, showToast } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  initEnquiryForms();
  initEnquiryModal();
});

/**
 * 1. Form Validation and Delivery
 */
function initEnquiryForms() {
  const forms = document.querySelectorAll('.krp-enquiry-form');
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  // Spam Defense 1: Honeypot field
  const honeypot = form.querySelector('input[name="website_hp"]');
  if (honeypot && honeypot.value.trim() !== '') {
    // Bot detected silently
    return;
  }

  // Spam Defense 2: Submission cooldown (20 seconds)
  const lastSubmitKey = 'krp_last_submission_time';
  try {
    const lastSubmitTime = localStorage.getItem(lastSubmitKey);
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 20000) {
      showToast('Please wait a few seconds before submitting another enquiry.', 'error');
      return;
    }
  } catch (err) {}

  // Field validation
  const nameInput = form.querySelector('input[name="student_name"]');
  const phoneInput = form.querySelector('input[name="student_phone"]');
  const parentNameInput = form.querySelector('input[name="parent_name"]');
  const emailInput = form.querySelector('input[name="student_email"]');
  const classInput = form.querySelector('select[name="student_class"], select[name="current_class"], input[name="student_class"], input[name="current_class"]');
  const cityInput = form.querySelector('input[name="student_city"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const consentInput = form.querySelector('input[name="consent"]');

  let isValid = true;

  // Validate Name
  if (!nameInput || nameInput.value.trim().length < 2) {
    showInputError(nameInput, 'Please enter the student\'s full name.');
    isValid = false;
  } else {
    clearInputError(nameInput);
  }

  // Validate Phone (10-digit Indian Mobile)
  const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(phoneVal)) {
    showInputError(phoneInput, 'Please enter a valid 10-digit mobile number.');
    isValid = false;
  } else {
    clearInputError(phoneInput);
  }

  // Validate Consent
  if (consentInput && !consentInput.checked) {
    showToast('Please agree to allow KRP to contact you regarding admissions.', 'error');
    isValid = false;
  }

  if (!isValid) return;

  // Selected Courses (Multi-Select Chips)
  const selectedCourseChips = form.querySelectorAll('input[name="courses"]:checked');
  const coursesList = Array.from(selectedCourseChips).map(cb => cb.value).join(', ') || 'General Enquiry';

  // Residential Preference
  const residentialRadio = form.querySelector('input[name="residential_pref"]:checked');
  const residentialPref = residentialRadio ? residentialRadio.value : 'Need Details';

  // Construct Form Data Object
  const formData = {
    studentName: nameInput.value.trim(),
    phone: phoneVal,
    parentName: parentNameInput ? parentNameInput.value.trim() : 'N/A',
    email: emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'N/A',
    currentClass: classInput ? classInput.value : 'N/A',
    city: cityInput && cityInput.value.trim() ? cityInput.value.trim() : 'Pune',
    courses: coursesList,
    residential: residentialPref,
    message: messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'Interested in admissions.'
  };

  // Build clean WhatsApp message
  const waText = 
`*ADMISSION ENQUIRY — KOTA RANKERS POINT PUNE*
━━━━━━━━━━━━━━━━━━━━━
*Student Name:* ${formData.studentName}
*Contact Number:* ${formData.phone}
*Parent Name:* ${formData.parentName}
*Email:* ${formData.email}
*Current Class / Stream:* ${formData.currentClass}
*City:* ${formData.city}
*Courses Interested:* ${formData.courses}
*Residential Facility:* ${formData.residential}
*Student Note:* ${formData.message}
━━━━━━━━━━━━━━━━━━━━━
Sent via krppune.com enquiry portal.`;

  const waUrl = `https://wa.me/${KRP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
  const mailtoUrl = `mailto:${KRP_CONFIG.EMAIL}?subject=${encodeURIComponent(`Admission Enquiry: ${formData.studentName} (${formData.courses})`)}&body=${encodeURIComponent(waText)}`;

  // Optional Formspree / Web3Forms fetch dispatch
  if (KRP_CONFIG.FORM_ENDPOINT && KRP_CONFIG.FORM_ENDPOINT.startsWith('http')) {
    try {
      fetch(KRP_CONFIG.FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(e => console.warn('Third party endpoint dispatch:', e));
    } catch (e) {}
  }

  // Record submission time
  try {
    localStorage.setItem(lastSubmitKey, Date.now().toString());
  } catch (e) {}

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  // Show Success UI in form container
  showFormSuccess(form, formData.studentName, mailtoUrl);
  showToast('Enquiry prepared! Opening WhatsApp to connect directly with KRP counsellors.', 'success');
}

function showInputError(input, msg) {
  if (!input) return;
  input.classList.add('is-invalid');
  const parent = input.closest('.form-group') || input.parentElement;
  let errorEl = parent.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error is-visible';
    parent.appendChild(errorEl);
  }
  errorEl.textContent = msg;
  errorEl.classList.add('is-visible');
}

function clearInputError(input) {
  if (!input) return;
  input.classList.remove('is-invalid');
  const parent = input.closest('.form-group') || input.parentElement;
  const errorEl = parent.querySelector('.form-error');
  if (errorEl) {
    errorEl.classList.remove('is-visible');
  }
}

function showFormSuccess(form, studentName, mailtoUrl) {
  form.innerHTML = `
    <div style="text-align: center; padding: 2.5rem 1rem;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: #E6EEFF; color: #1D3FA8; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: #0A1A4F;">Thank You, ${studentName}!</h3>
      <p style="color: #4B5878; font-size: 0.95rem; line-height: 1.6; max-width: 440px; margin: 0 auto 1.75rem;">
        Your enquiry has been formatted and opened in WhatsApp. Our academic team at Manaji Nagar, Narhe, Pune will review your requirements and reach out promptly.
      </p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;">
        <a href="${mailtoUrl}" class="btn btn-secondary btn-sm" style="font-size: 0.8125rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Send by Email Instead
        </a>
        <a href="tel:${KRP_CONFIG.PHONE_TEL}" class="btn btn-primary btn-sm" style="font-size: 0.8125rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call Direct: ${KRP_CONFIG.PHONE_PRIMARY}
        </a>
      </div>
    </div>
  `;
}

/**
 * 2. Enquiry Modal Open/Close & Course Pre-selection
 */
function initEnquiryModal() {
  const modal = document.getElementById('enquiry-modal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('[data-modal-open="enquiry"]');
  const closeTriggers = modal.querySelectorAll('.modal-close, [data-modal-close]');

  const openModal = (courseName = null) => {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // If courseName is provided, check the corresponding checkbox
    if (courseName) {
      const checkbox = modal.querySelector(`input[name="courses"][value="${courseName}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    }

    // Set focus
    const firstInput = modal.querySelector('input[name="student_name"]');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course');
      openModal(course);
    });
  });

  closeTriggers.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
