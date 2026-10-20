/**
 * KOTA RANKERS POINT (KRP) · FILTER CHIPS & EXAM FINDER
 */

// Exam data for interactive Exam Finder
const EXAM_FINDER_DATA = {
  nda: {
    title: "NDA / SSB / CDS / TES / MNS",
    category: "Defence Flagship",
    description: "Kota-grade academic mastery combined with disciplined defence academy routine, SSB interview mentorship, and dedicated residential campus in Narhe Pune.",
    tags: ["Boys & Girls Residence", "Written + SSB", "Physical Training", "Class 11/12/12th Passed"],
    link: "courses/nda-ssb-cds-tes-mns/index.html"
  },
  imucet: {
    title: "IMUCET (Indian Maritime University)",
    category: "Merchant Navy Entrance",
    description: "Comprehensive guidance for DNS (Diploma in Nautical Science), B.Tech Marine Engineering, sponsorship test preparation, and interview grooming.",
    tags: ["PCM Focus", "Aptitude & English", "Company Sponsorship Guidance", "Mock Simulators"],
    link: "courses/imucet/index.html"
  },
  jee: {
    title: "IIT-JEE (Main & Advanced)",
    category: "Engineering Prestige",
    description: "Rigorous problem-solving curriculum based on authentic Kota pedagogy. Deep concept clarity in Physics, Chemistry, and Mathematics with continuous national-standard testing.",
    tags: ["Kota Worksheets", "Daily Practice Problems (DPP)", "Doubt Clinic", "Target 99+ Percentile"],
    link: "courses/iit-jee/index.html"
  },
  neet: {
    title: "NEET UG (Medical Entrance)",
    category: "Medical Entrance",
    description: "Line-by-line NCERT mastery for Biology combined with high-accuracy problem solving in Physics and Chemistry. Rigorous OMR-based full-length test series.",
    tags: ["NCERT Centric", "Biology Diagram Mastery", "High Accuracy Drills", "Dedicated Doubt Faculty"],
    link: "courses/neet/index.html"
  },
  mhtcet: {
    title: "MHT-CET & CUET",
    category: "State CET & Central Universities",
    description: "Specialized speed and accuracy coaching for Maharashtra state engineering/pharmacy seats (PCM / PCB) and national central university entrance.",
    tags: ["PCM & PCB Batches", "Maharashtra State Board Focus", "Speed Optimization", "High Weightage Focus"],
    link: "courses/mht-cet-cuet/index.html"
  },
  foundation: {
    title: "Foundation (Classes 8th to 10th)",
    category: "Early Rank Building",
    description: "Build exceptional scientific temper, mathematical logic, and competitive aptitude early. Preparation for Olympiads, NTSE, and strong base for JEE/NEET/NDA.",
    tags: ["Classes 8-10", "Olympiad / IJSO", "School + Competitive Sync", "Mental Aptitude"],
    link: "courses/other-courses/index.html#foundation"
  },
  iiser: {
    title: "IISER Aptitude Test (IAT)",
    category: "Pure Sciences & Research",
    description: "In-depth conceptual preparation across Physics, Chemistry, Maths, and Biology for India's premier scientific research institutes (IISERs & IISc).",
    tags: ["Four Subject Mastery", "Research Aptitude", "Analytical Depth"],
    link: "courses/other-courses/index.html#iiser"
  },
  afcat: {
    title: "AFCAT & Air Force Officer Entry",
    category: "Air Force Entry",
    description: "Targeted coaching for AFCAT written exam covering General Awareness, Verbal Ability, Numerical Ability, and Military Reasoning.",
    tags: ["Graduates / Final Year", "Speed Math & Reasoning", "Current Affairs", "EKT Guidance"],
    link: "courses/other-courses/index.html#afcat"
  },
  naval: {
    title: "Naval Entrance Preparation",
    category: "Indian Navy Entrance",
    description: "Structured mentorship for Indian Navy officer entries and sailor streams with physical benchmarks and technical syllabus coverage.",
    tags: ["Technical & General", "Physical Fitness", "Disciplined Batch"],
    link: "courses/other-courses/index.html#naval"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initExamFinder();
  initGenericFilters();
});

/**
 * 1. Interactive Exam Finder
 */
function initExamFinder() {
  const container = document.getElementById('exam-finder');
  if (!container) return;

  const pillButtons = container.querySelectorAll('.exam-pill-btn');
  const cardTitle = document.getElementById('finder-title');
  const cardCat = document.getElementById('finder-category');
  const cardDesc = document.getElementById('finder-desc');
  const cardTags = document.getElementById('finder-tags');
  const cardLink = document.getElementById('finder-link');

  if (!pillButtons.length || !cardTitle) return;

  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const examKey = btn.getAttribute('data-exam');
      const data = EXAM_FINDER_DATA[examKey];
      if (!data) return;

      pillButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      cardTitle.textContent = data.title;
      if (cardCat) cardCat.textContent = data.category;
      if (cardDesc) cardDesc.textContent = data.description;
      
      // Update tags
      if (cardTags) {
        cardTags.innerHTML = data.tags.map(t => `<span class="exam-tag">${t}</span>`).join('');
      }

      // Check current relative depth for link
      const isInSubfolder = window.location.pathname.includes('/courses/');
      const linkPrefix = isInSubfolder ? '../' : '';
      if (cardLink) {
        cardLink.setAttribute('href', linkPrefix + data.link);
      }
    });
  });
}

/**
 * 2. Generic Filter Chips (for Faculty, Results, Gallery)
 */
function initGenericFilters() {
  const filterGroups = document.querySelectorAll('[data-filter-group]');
  filterGroups.forEach(group => {
    const filterButtons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.getAttribute('data-filter-group');
    const items = document.querySelectorAll(targetSelector);

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter');

        filterButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        items.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (filterVal === 'all' || itemCat === filterVal || (itemCat && itemCat.includes(filterVal))) {
            item.style.display = '';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });
}
