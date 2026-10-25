# Kota Rankers Point (KRP) · Static Website Documentation

> **Production-Ready Static Website for Kota Rankers Point (KRP), Manaji Nagar, Narhe, Pune.**  
> Built with 100% pure HTML5, CSS3, and vanilla ES6+ JavaScript. No server, no PHP, no frameworks, no dependencies.

---

## 1. Important Facts & Assumptions to Confirm with KRP Before Launch

Before final public deployment, review and replace all marked placeholders (`<!-- VERIFY WITH KRP -->`):

| Fact / Item | Current Placeholder / Setting | Action Required by KRP |
|---|---|---|
| **CU-CET vs CUET** | Used `MHT-CET & CUET` | Confirm whether "CU-CET" on older collateral refers to NTA CUET (Central University Entrance Test). |
| **Indian Navy Offering** | 10+2 B.Tech Navy & Sailor Agniveer | Confirm exact current batch offerings for Indian Navy (SSR/MR vs Officer cadet entry). |
| **Phone Numbers** | `+91 86690 99430` / `+91 90350 92974` | Confirmed from live records; verify primary receiving staff. |
| **WhatsApp Number** | `918669099430` | Confirm the exact WhatsApp business mobile where form enquiries should open. |
| **Email Address** | `krppune.official@gmail.com` | Confirm official receiving inbox for `mailto:` fallbacks. |
| **Residential Amenities** | Separate boys & girls hostels with study desks, meals, wardens | Review the amenity checklists in `residential-facilities/index.html` against actual physical hostel assets. |
| **Faculty Credentials** | Senior mentors in Physics, Chemistry, Maths, Bio, Defence | Replace placeholder names and degrees with actual faculty profiles and photos. |
| **Results & Selections** | AIR 42 NDA, AIR 318 JEE, 682 NEET, AIR 12 IMUCET | Replace placeholder rank cards with official verified KRP student names, photos, and ranks. |
| **Academic Session** | `2026-2027` | Confirm session year for "Admissions Open" badges and scholarship exams. |
| **Indexed URLs** | Standard folder-based clean slugs | Check Google Search Console for any legacy indexed URLs on `krppune.com` to map in `.htaccess`. |

---

## 2. Folder Map

```
/
├── index.html                                  # Homepage with hero, counters, exam finder, bento, FAQ
├── 404.html                                     # Custom friendly 404 error page
├── sitemap.xml                                  # Full XML sitemap of all 17 pages
├── robots.txt                                   # Search engine robot directives
├── site.webmanifest                             # Web App manifest (icons, theme colors)
├── .htaccess                                    # Apache / Hostinger Gzip, browser caching, and security
├── _redirects                                   # Netlify / Cloudflare Pages routing file
├── README.md                                    # This guide
├── about-us/
│   └── index.html                              # Story, vision, mission, directorate message
├── faculty/
│   └── index.html                              # Mentors grid with subject filter chips
├── courses/
│   ├── index.html                              # Courses overview + interactive exam finder
│   ├── nda-ssb-cds-tes-mns/
│   │   └── index.html                          # Flagship Defence Wing & Residential timetable
│   ├── imucet/
│   │   └── index.html                          # Merchant Navy DNS & Marine Engineering
│   ├── iit-jee/
│   │   └── index.html                          # JEE Main & Advanced toggled panels
│   ├── neet/
│   │   └── index.html                          # NEET UG NCERT strategy & OMR testing
│   ├── mht-cet-cuet/
│   │   └── index.html                          # MHT-CET PCM/PCB & CUET preparation
│   └── other-courses/
│       └── index.html                          # Foundation 8-10, IISER IAT, AFCAT, Navy
├── residential-facilities/
│   └── index.html                              # Boys & Girls separate hostel blocks with toggle
├── results/
│   └── index.html                              # Verified results grid with exam filters
├── media-gallery/
│   └── index.html                              # Campus masonry gallery, lightbox & video facades
├── contact-us/
│   └── index.html                              # Split layout with form, address, and Google Map
├── privacy-policy/
│   └── index.html                              # Static, honest privacy policy
├── terms/
│   └── index.html                              # Terms of service and hostel code of conduct
└── assets/
    ├── css/
    │   ├── base.css                            # Tokens, no-italics reset, typography, utilities
    │   ├── layout.css                          # Header, megamenu, mobile drawer, footer, floating bars
    │   ├── components.css                      # Buttons, cards, bento grid, modal, accordions, tabs
    │   └── pages.css                           # Page-specific hero, timetable, quick facts, tables
    ├── js/
    │   ├── main.js                             # Global KRP_CONFIG, preloader, scroll progress, toasts
    │   ├── nav.js                              # Header scroll shrink, mobile drawer, active link
    │   ├── reveal.js                           # IntersectionObserver scroll animations
    │   ├── counters.js                         # Count-up statistics when 40% visible
    │   ├── tabs.js                             # Tab switcher, boys/girls residence toggle
    │   ├── accordion.js                        # FAQ and syllabus smooth accordions
    │   ├── carousel.js                         # Scroll-snap carousels with swipe & arrows
    │   ├── filters.js                          # Exam finder & generic content filters
    │   ├── lightbox.js                         # Gallery image viewer & video facade loader
    │   ├── form.js                             # Client-side form validation, WhatsApp & mailto flow
    │   └── effects.js                          # Gold cursor glow, 3D card tilt, magnetic buttons
    ├── svg/                                    # Scalable vector assets (logo, compass, shield, etc.)
    └── img/                                    # Tasteful SVG vector placeholders for photos
```

---

## 3. How to Update Phone, WhatsApp & Email in ONE Place

Open [`assets/js/main.js`](file:///Users/macbookpro/Developement/Kota%20Rankers%20Point%20-%20Web/assets/js/main.js). At the very top of the file, update the `KRP_CONFIG` constant:

```javascript
export const KRP_CONFIG = {
  INSTITUTE_NAME: "Kota Rankers Point",
  CITY: "Pune, Maharashtra",
  ADDRESS: "3rd Floor, Navya Business Park, Manaji Nagar, Narhe, Pune – 411041",
  PHONE_PRIMARY: "+91 86690 99430",
  PHONE_SECONDARY: "+91 90350 92974",
  PHONE_TEL: "+918669099430",
  WHATSAPP_NUMBER: "918669099430", // Country code + 10 digits without '+' or spaces
  EMAIL: "krppune.official@gmail.com",
  FORM_ENDPOINT: "", // Optional Formspree / Web3Forms endpoint URL
  ACADEMIC_SESSION: "2026-2027"
};
```

All WhatsApp click-to-chat links and submission handlers throughout the website will automatically use these updated details.

---

## 4. How to Replace Placeholder Images

All photo slots currently use vector SVG placeholders located in `assets/img/`. To replace them with real photographs:
1. Export your photograph as a modern `.webp` or `.jpg` file (recommended size: `1200x800` for gallery, `800x600` for cards, `600x700` for faculty/cadets).
2. Save the image into `assets/img/` (e.g. `assets/img/campus-photo-1.webp`).
3. In the relevant HTML file, locate the `<img>` tag and update its `src` attribute:
   ```html
   <!-- Before: SVG Placeholder -->
   <img src="../assets/img/campus-classroom.svg" alt="...">

   <!-- After: Real Photo -->
   <img src="../assets/img/campus-classroom-real.webp" alt="Real classroom at Kota Rankers Point Pune">
   ```

---

## 5. How to Add a New Result, Faculty Member, or Gallery Item

### Adding a Result Card
In [`results/index.html`](file:///Users/macbookpro/Developement/Kota%20Rankers%20Point%20-%20Web/results/index.html), copy and paste an existing `.result-card` block inside `.results-grid`:

```html
<div class="result-card" data-category="nda" data-reveal>
  <div class="result-badge-top">Recommended</div>
  <div class="result-rank-num">AIR 42</div>
  <div class="result-exam-name">NDA 151 Course</div>
  <div class="result-student-name">Student Full Name</div>
  <div style="font-size: 0.8125rem; color: var(--ink-muted);">NDA Khadakwasla Selected · 2-Year Cadet</div>
  <div class="result-verified-tick">
    <span>Verified by KRP</span>
  </div>
</div>
```

### Adding a Faculty Card
In [`faculty/index.html`](file:///Users/macbookpro/Developement/Kota%20Rankers%20Point%20-%20Web/faculty/index.html), copy and paste an existing `.faculty-card` block inside `.faculty-grid` and set the `data-category` attribute (`physics`, `chemistry`, `mathematics`, `biology`, or `defence`).

### Adding a Gallery Photo
In [`media-gallery/index.html`](file:///Users/macbookpro/Developement/Kota%20Rankers%20Point%20-%20Web/media-gallery/index.html), copy an existing `.gallery-item` block inside `.gallery-grid`:
```html
<div class="gallery-item" data-category="campus" data-lightbox data-src="../assets/img/your-photo.webp" data-caption="Description of event or facility" data-reveal>
  <img src="../assets/img/your-photo.webp" alt="Campus facility" loading="lazy">
  <div class="gallery-overlay">
    <div class="gallery-caption">
      <h5>Title</h5>
      <span>Category</span>
    </div>
  </div>
</div>
```

---

## 6. How to Deploy to Static Hosting

### Hostinger (cPanel / hPanel)
1. Log in to your Hostinger account and open **File Manager** for `krppune.com`.
2. Navigate to `public_html/`.
3. Upload all files and folders from this project directly into `public_html/` (including `.htaccess`).
4. Ensure `.htaccess` is uploaded (enable "Show Hidden Files" in File Manager).
5. Done! The site is live with gzip compression, clean URLs, and HTTPS.

### Netlify / Cloudflare Pages / GitHub Pages
- Simply drag and drop the project folder or push to a GitHub repository and link to Cloudflare Pages or Netlify.
- The `_redirects` file is pre-configured for instant routing.

---

## 7. Post-Launch SEO & Verification Checklist

- [ ] Verify phone numbers, WhatsApp, and email address by submitting a test enquiry on the website.
- [ ] Submit `https://krppune.com/sitemap.xml` to **Google Search Console**.
- [ ] Verify Google Business Profile link for "Kota Rankers Point, Manaji Nagar, Narhe, Pune".
- [ ] Replace `<!-- VERIFY WITH KRP -->` placeholder names and ranks with officially confirmed student data.
- [ ] Test mobile navigation and WhatsApp click-to-chat on iOS and Android devices.
